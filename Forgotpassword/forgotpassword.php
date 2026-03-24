<?php
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type, Authorization");  

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "sign_language_master";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Lấy từ input "username" (có thể là email hoặc username)
    $input = $_POST['username'] ?? '';

    $sql = "SELECT * FROM users WHERE email = ? OR username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $input, $input);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $email = $user['email']; // luôn gửi về Gmail người dùng

        $token = bin2hex(random_bytes(32));
        $expiry = date("Y-m-d H:i:s", strtotime("+1 hour"));

        $update_sql = "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?";
        $stmt_update = $conn->prepare($update_sql);
        $stmt_update->bind_param("sss", $token, $expiry, $email);
        $stmt_update->execute();

        $reset_link = "https://unpoetically-unstreaked-elnora.ngrok-free.dev/Sign_Language_Master/Forgotpassword/resetpassword.html?token=$token";

        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'quantronghungpka@gmail.com'; // Gmail admin
            $mail->Password = 'udwtejmiwsdgrwcd';    // App Password Gmail
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom('your_admin@gmail.com', 'Sign Language Master');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = '🔑 Yêu cầu đặt lại mật khẩu - Sign Language Master';
            $mail->CharSet = "UTF-8";
            $mail->Encoding = "base64";

            $mail->Body = "
            <div style='font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #ffffff;'>
                <div style='text-align: center;'>
                    <img src='https://img.icons8.com/ios-filled/100/3498db/key-security.png' alt='Reset Password' style='width:80px;height:80px;margin-bottom:15px;'/>
                    <h2 style='color: #2c3e50; margin-bottom: 10px;'>Đặt lại mật khẩu của bạn</h2>
                </div>

                <p>Xin chào <b>{$user['username']}</b>,</p>
                <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản <b>Sign Language Master</b>. Vui lòng nhấn nút bên dưới để tiến hành:</p>

                <div style='text-align: center; margin: 30px 0;'>
                    <a href='$reset_link' 
                    style='background: #3498db; color: #fff; padding: 14px 24px; 
                            text-decoration: none; border-radius: 6px; font-weight: bold; 
                            font-size: 16px; display: inline-block;'>
                        🔐 Đặt lại mật khẩu ngay
                    </a>
                </div>

                <p style='font-size: 14px; color: #7f8c8d;'>
                    ⏰ Liên kết này sẽ hết hạn sau <b>1 giờ</b> kể từ khi bạn nhận được email.<br>
                    ❗ Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.
                </p>

                <hr style='margin: 20px 0; border: none; border-top: 1px solid #eee;'>

                <p style='font-size: 12px; color: #95a5a6; text-align: center;'>
                    © 2025 Sign Language Master. All rights reserved.
                </p>
            </div>
        ";


            $mail->send();
            echo "Một liên kết đặt lại mật khẩu đã được gửi đến email của bạn.";
        } catch (Exception $e) {
            echo "Không thể gửi email. Lỗi: {$mail->ErrorInfo}";
        }
    } else {
        echo "Email/username không tồn tại trong hệ thống.";
    }
}
$conn->close();