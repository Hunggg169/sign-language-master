<?php
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type, Authorization");  

session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection details
$servername = "localhost";
$username = "root";
$password = "123456"; // Mật khẩu của MySQL
$dbname = "sign_language_master"; // Tên cơ sở dữ liệu

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Tạo một token ngẫu nhiên để lưu trong cookie
function generateToken() {
    return bin2hex(random_bytes(16));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') { // Kiểm tra phương thức POST
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $username_or_email = $_POST['username'];
        $password = $_POST['password'];
        $remember_me = isset($_POST['remember_me']) && $_POST['remember_me'] == 'on';

        $sql = "SELECT * FROM users WHERE username = ? OR email = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("ss", $username_or_email, $username_or_email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();

                if (password_verify($password, $user['password'])) {
                    $_SESSION['user_id'] = $user['id'];
                    echo "Login successful!";

                    // Nếu người dùng chọn Duy trì đăng nhập, tạo và lưu token vào cookie
                    if ($remember_me) {
                        $login_token = generateToken();
                        setcookie("login_token", $login_token, time() + (86400 * 30), "/");

                        // Lưu token vào cơ sở dữ liệu
                        $updateTokenSQL = "UPDATE users SET login_token = ? WHERE id = ?";
                        $updateStmt = $conn->prepare($updateTokenSQL);
                        $updateStmt->bind_param("si", $login_token, $user['id']);
                        $updateStmt->execute();
                        $updateStmt->close();
                    }
                } else {
                    echo "Invalid password.";
                }
            } else {
                echo "User not found.";
            }
        } else {
            echo "Failed to prepare the statement: " . $conn->error;
        }
        $stmt->close();
    } else {
        echo "Username and password are required.";
    }
} else {
    echo "Invalid request method.";
}

$conn->close();
?>