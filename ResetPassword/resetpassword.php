<?php
require 'database_connection.php'; // Kết nối cơ sở dữ liệu của bạn

// Lấy token từ URL
$token = $_GET['token'];

// Kiểm tra token hợp lệ và không hết hạn
$sql = "SELECT * FROM users WHERE reset_token='$token' AND reset_token_expiry > NOW()";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $new_password = password_hash($_POST['new_password'], PASSWORD_BCRYPT);
        
        // Cập nhật mật khẩu mới và xóa token
        $sql = "UPDATE users SET password='$new_password', reset_token=NULL, reset_token_expiry=NULL WHERE reset_token='$token'";
        if ($conn->query($sql) === TRUE) {
            echo "Mật khẩu của bạn đã được cập nhật.";
        } else {
            echo "Lỗi khi cập nhật mật khẩu.";
        }
    }
} else {
    echo "Mã token không hợp lệ hoặc đã hết hạn.";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>

<body>
    <h2>Đặt Lại Mật Khẩu</h2>
    <form method="POST">
        <label for="new_password">Nhập mật khẩu mới:</label>
        <input type="password" id="new_password" name="new_password" required>
        <button type="submit">Đổi mật khẩu</button>
    </form>
</body>

</html>