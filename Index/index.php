<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "NPDiu140103.123@";
$dbname = "LANGUAGE_MASTER_";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Kiểm tra nếu có cookie login_token
if (isset($_COOKIE['login_token']) && !isset($_SESSION['user_id'])) {
    $token = $_COOKIE['login_token'];

    $sql = "SELECT id FROM users WHERE login_token = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['id']; // Tự động đăng nhập
    }
    $stmt->close();
}

$conn->close();
?>