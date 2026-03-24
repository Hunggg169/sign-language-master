<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// --- Kết nối database ---
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "sign_language_master";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Lỗi kết nối database."]);
    exit;
}

// --- Nhận dữ liệu POST JSON ---
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Dữ liệu không hợp lệ."]);
    exit;
}

$currentPassword = $data["currentPassword"];
$newPassword = $data["newPassword"];
$userId = 1; // Tạm, sau sẽ lấy từ SESSION

// --- Lấy mật khẩu hiện tại ---
$sql = "SELECT password FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(["status" => "error", "message" => "Không tìm thấy người dùng."]);
    exit;
}

$row = $result->fetch_assoc();
$hashedPassword = $row["password"];

// --- Kiểm tra mật khẩu hiện tại ---
if (!password_verify($currentPassword, $hashedPassword)) {
    echo json_encode(["status" => "error", "message" => "Mật khẩu hiện tại không chính xác."]);
    exit;
}

// --- Cập nhật mật khẩu mới ---
$newHash = password_hash($newPassword, PASSWORD_DEFAULT);
$update = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$update->bind_param("si", $newHash, $userId);

if ($update->execute()) {
    echo json_encode(["status" => "success", "message" => "Đổi mật khẩu thành công!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Không thể cập nhật mật khẩu."]);
}

$conn->close();
?>