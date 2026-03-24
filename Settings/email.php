<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");


error_reporting(0); // ẩn thông báo lỗi HTML

// Nếu lỗi kết nối
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Không thể kết nối CSDL."]);
    exit;
}

// ===== Kết nối database =====
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "sign_language_master";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Không thể kết nối CSDL."]);
    exit;
}

// ===== Lấy user cụ thể theo username =====
$usernameToTest = "hunggg169"; // test user

$sql = "SELECT id, username, email, username AS name
        FROM users 
        WHERE username = ? LIMIT 1";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usernameToTest);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "status" => "success",
        "user" => [
            "id" => (int)$row["id"],
            "username" => $row["username"],
            "email" => $row["email"],
            "name" => $row["name"]
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} else {
    echo json_encode(["status" => "error", "message" => "Không tìm thấy user hunggg169"]);
}

$stmt->close();
$conn->close();
?>