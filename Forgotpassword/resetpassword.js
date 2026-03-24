function getToken() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

async function resetPassword() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const token = getToken();
  const messageBox = document.getElementById("message");

  if (newPassword !== confirmPassword) {
    messageBox.innerText = "Mật khẩu không khớp!";
    messageBox.style.color = "red";
    return;
  }

  try {
    const response = await fetch(
      "http://localhost/Sign_Language_Master/Forgotpassword/resetpassword.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      }
    );

    const result = await response.json();
    messageBox.innerText = result.message;

    if (result.success) {
      messageBox.style.color = "green";

      //  Sau 3 giây chuyển hướng
      setTimeout(() => {
        window.location.href =
          "http://localhost/Sign_Language_Master/Login/login.html";
      }, 3000);
    } else {
      messageBox.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    messageBox.innerText = "Có lỗi xảy ra, vui lòng thử lại.";
    messageBox.style.color = "red";
  }
}
