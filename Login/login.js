document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modal-message");
  const closeModal = document.getElementsByClassName("close")[0];
  const goToCourseBtn = document.getElementById("go-to-course-btn");
  const showAccountBtn = document.getElementById("show-account-btn");
  const accountBtn = document.getElementById("account-btn");

  // Xử lý sự kiện khi đóng modal
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Xử lý gửi form đăng nhập
  document
    .querySelector("#login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);

      fetch("http://localhost/Sign_Language_Master/Login/login.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) throw new Error(`Status code: ${response.status}`);
          return response.text();
        })
        .then((data) => {
          modalMessage.innerHTML = data;
          modal.style.display = "block"; // Hiển thị modal với phản hồi từ PHP

          // Kiểm tra nếu đăng nhập thành công
          if (data.includes("Login successful!")) {
            localStorage.setItem("loggedIn", "true"); // Lưu trạng thái đăng nhập vào localStorage
            goToCourseBtn.style.display = "inline"; // Hiển thị nút "Đi đến khóa học"
            showAccountBtn.style.display = "inline"; // Hiển thị nút "Hiện tài khoản"
            accountBtn.style.display = "none"; // Đảm bảo nút "Đi tới Tài Khoản" ẩn
          } else {
            goToCourseBtn.style.display = "none";
            showAccountBtn.style.display = "none";
            accountBtn.style.display = "none";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          modalMessage.textContent = "Error: " + error.message;
          modal.style.display = "block"; // Hiển thị modal với lỗi
          goToCourseBtn.style.display = "none";
          showAccountBtn.style.display = "none";
          accountBtn.style.display = "none";
        });
    });

  // Xử lý sự kiện khi nhấn nút "Hiện tài khoản" để hiển thị nút "Đi tới Tài Khoản"
  showAccountBtn.addEventListener("click", function () {
    accountBtn.style.display = "inline"; // Hiển thị nút "Đi tới Tài Khoản"
  });
});
