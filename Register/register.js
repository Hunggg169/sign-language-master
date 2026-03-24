document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const modal = document.getElementById("myModal");
    const closeModal = document.getElementsByClassName("close")[0];

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Ngăn hành động submit mặc định

        const formData = new FormData(this); // Lấy dữ liệu từ form

        // 🚨 Sửa lại URL cho đúng với nơi đặt register.php
        // Nếu bạn chạy XAMPP thì thường là http://localhost/Sign_Language_Master/Register/register.php
        fetch("http://localhost/Sign_Language_Master/Register/register.php", {
                method: "POST",
                body: formData,
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Network response was not ok. Status code: ${response.status}`
                    );
                }
                return response.text(); // Đọc phản hồi từ PHP
            })
            .then((data) => {
                // Hiển thị thông báo phản hồi trong modal
                document.getElementById("modal-message").textContent = data;
                modal.style.display = "block";

                // Nếu đăng ký thành công, reset form
                if (data.includes("Tài khoản đã đăng ký thành công")) {
                    form.reset();
                }
            })
            .catch((error) => {
                console.error("Đã xảy ra lỗi:", error);
                document.getElementById("modal-message").textContent =
                    "Đã xảy ra lỗi: " + error.message;
                modal.style.display = "block";
            });
    });

    // Khi nhấn vào nút "X", đóng modal
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Khi nhấn ra ngoài modal, cũng đóng modal
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});