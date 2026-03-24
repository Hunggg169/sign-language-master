document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra trạng thái đăng nhập từ localStorage
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const loginAccountBtn = document.getElementById("login-account-btn");
  const loginDropdown = document.getElementById("login-dropdown");
  const profileAccountBtn = document.getElementById("profile-account-btn");
  const profileDropdown = document.getElementById("profile-dropdown");

  // Cập nhật giao diện dựa trên trạng thái đăng nhập
  if (isLoggedIn) {
    loginAccountBtn.style.display = "none";
    profileAccountBtn.style.display = "inline"; // Hiển thị nút Hồ Sơ
    loginDropdown.style.display = "none"; // Ẩn đăng ký/đăng nhập dropdown
  } else {
    loginAccountBtn.style.display = "inline"; // Hiển thị nút Đăng Ký/Đăng Nhập
    profileAccountBtn.style.display = "none"; // Ẩn nút Hồ Sơ
    profileDropdown.style.display = "none";
  }

  // Toggle dropdown Đăng Ký/Đăng Nhập
  loginAccountBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    loginDropdown.style.display =
      loginDropdown.style.display === "block" ? "none" : "block";
    profileDropdown.style.display = "none"; // Đảm bảo ẩn dropdown Hồ Sơ
  });

  // Toggle dropdown Hồ Sơ
  profileAccountBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    profileDropdown.style.display =
      profileDropdown.style.display === "block" ? "none" : "block";
    loginDropdown.style.display = "none"; // Đảm bảo ẩn dropdown Đăng Nhập
  });

  // Đăng xuất
  window.logout = function () {
    localStorage.removeItem("loggedIn");
    location.reload(); // Tải lại trang để cập nhật giao diện
  };

  // Đóng dropdown khi nhấp ra ngoài
  document.addEventListener("click", function (e) {
    if (
      !loginAccountBtn.contains(e.target) &&
      !loginDropdown.contains(e.target)
    ) {
      loginDropdown.style.display = "none";
    }
    if (
      !profileAccountBtn.contains(e.target) &&
      !profileDropdown.contains(e.target)
    ) {
      profileDropdown.style.display = "none";
    }
  });

  // Điều hướng đến trang khóa học và lưu trạng thái đăng nhập
  window.goToCourse = function () {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "../Index/index.html";
  };

  // Toggle box visibility
  document
    .getElementById("toggleBox")
    .addEventListener("click", function (event) {
      event.preventDefault();
      var box = document.getElementById("box");
      box.style.display = box.style.display === "none" ? "block" : "none";
      if (box.style.display === "none") box.style.marginLeft = "0";
    });

  // Toggle header2 position on bars click
  document.querySelector(".bars").addEventListener("click", function (event) {
    event.preventDefault();
    var header2 = document.querySelector("header2");
    header2.classList.toggle("moved");
  });
});
