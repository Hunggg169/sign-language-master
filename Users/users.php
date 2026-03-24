<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "sign_language_master";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Lỗi kết nối database."]);
    exit;
}

$sql = "SELECT id, username FROM users ORDER BY id DESC";
$result = $conn->query($sql);

$defaultAvatar = "../Image/avatars.png";
$users = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['avatar'] = $defaultAvatar;
        $users[] = $row;
    }
}

echo json_encode(["status" => "success", "users" => $users], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$conn->close();