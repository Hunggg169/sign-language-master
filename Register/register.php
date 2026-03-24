<?php
header("Access-Control-Allow-Origin: *"); // Cho phép mọi origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Tắt các thông báo lỗi không cần thiết
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

// Database connection details
$servername = "localhost";
$username = "root";
$password = "123456"; // Mật khẩu của MySQL
$dbname = "sign_language_master"; // Tên cơ sở dữ liệu

// Kết nối tới cơ sở dữ liệu
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Lấy dữ liệu từ form
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $retype_password = $_POST['retype_password'];

    // Kiểm tra nếu mật khẩu nhập lại không trùng khớp
    if ($password !== $retype_password) {
        echo "Mật khẩu nhập lại không trùng khớp. Vui lòng thử lại.";
        exit();
    }

    // Kiểm tra xem email hoặc username đã tồn tại chưa
    $check_sql = "SELECT * FROM users WHERE email = ? OR username = ?";
    $stmt = $conn->prepare($check_sql);
    $stmt->bind_param("ss", $email, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Nếu tài khoản đã tồn tại
        echo "Tài khoản với email hoặc username này đã tồn tại. Vui lòng thử lại.";
    } else {
        // Nếu tài khoản chưa tồn tại, thêm vào cơ sở dữ liệu
        $hashed_password = password_hash($password, PASSWORD_DEFAULT); // Hash mật khẩu

        $insert_sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($insert_sql);
        $stmt->bind_param("sss", $email, $username, $hashed_password);

        if ($stmt->execute()) {
            echo "Tài khoản đã đăng ký thành công!";
        } else {
            echo "Đã có lỗi xảy ra trong quá trình đăng ký.";
        }
    }

    // Đóng kết nối
    $stmt->close();
    $conn->close();
} else {
    echo "No POST data received.";
}

?>