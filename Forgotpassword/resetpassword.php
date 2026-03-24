<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$token = $data['token'] ?? '';
$newPassword = $data['newPassword'] ?? '';

if (!$token || !$newPassword) {
    echo json_encode(["success" => false, "message" => "Thiếu dữ liệu"]);
    exit;
}

// TODO: kiểm tra token trong DB, hạn sử dụng
// Ví dụ tìm email từ token
// $stmt = $pdo->prepare("SELECT email FROM password_resets WHERE token = ? AND expires_at > NOW()");
// $stmt->execute([$token]);
// $row = $stmt->fetch();

if (true) { // giả sử token hợp lệ
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Cập nhật mật khẩu vào DB
    // $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE email = ?");
    // $stmt->execute([$hashedPassword, $row['email']]);

    echo json_encode(["success" => true, "message" => "Đặt lại mật khẩu thành công!"]);
} else {
    echo json_encode(["success" => false, "message" => "Token không hợp lệ hoặc đã hết hạn"]);
}
?>