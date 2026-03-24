function toggleSearchWrapper() {
    const searchWrapper = document.getElementById("searchWrapper");
    const sidebar = document.getElementById("siderbar");

    if (
        searchWrapper.style.display === "none" ||
        searchWrapper.style.display === ""
    ) {
        searchWrapper.style.display = "flex";
        // Chỉ thêm margin-left khi sidebar không bị ẩn
        if (!sidebar.classList.contains("sidebar-hidden")) {
            searchWrapper.style.marginLeft = "220px";
        } else {
            searchWrapper.style.marginLeft = "0";
        }
    } else {
        searchWrapper.style.display = "none";
        searchWrapper.style.marginLeft = "0"; // Đặt lại margin-left khi ẩn
    }
}

function hideSearchWrapper() {
    const searchWrapper = document.getElementById("searchWrapper");
    searchWrapper.style.display = "none";
    searchWrapper.style.marginLeft = "0"; // Đặt lại margin-left khi ẩn
}
// Hien ra Pencil2
document.addEventListener("DOMContentLoaded", function() {
    const togglePencilButton = document.getElementById("toggle-pencil2");
    const hidePencil2 = document.querySelector(".hide-pencil2");

    togglePencilButton.addEventListener("click", function() {
        hidePencil2.classList.toggle("active");
    });
});

// Hien ra Notification2
document.addEventListener("DOMContentLoaded", function() {
    const toggleNotification = document.getElementById("toggle-notification2");
    const hideNotification = document.querySelector(".notification2-2");

    toggleNotification.addEventListener("click", function() {
        hideNotification.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const tonggleUserAcount = document.getElementById("toggle-user-acount");
    const hideUserAcount = document.querySelector(".hide-user-acount");

    tonggleUserAcount.addEventListener("click", function() {
        hideUserAcount.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const questionButton = document.querySelector(".dat-cau-hoi button");
    const questionForm = document.getElementById("questionForm");

    // Hiển thị form khi nhấn vào nút "Đặt Câu Hỏi"
    questionButton.addEventListener("click", function() {
        questionForm.style.display = "block";
    });

    // Ẩn form
    window.closeForm = function() {
        questionForm.style.display = "none";
    };
});

document.addEventListener("DOMContentLoaded", function() {
    const chuDeButton = document.querySelector(".tieu-de-phai-btn:first-child");

    chuDeButton.addEventListener("click", function() {
        chuDeButton.classList.toggle("active");
    });

    // Ẩn chu-de-list khi nhấp ra bên ngoài
    document.addEventListener("click", function(event) {
        if (!chuDeButton.contains(event.target)) {
            chuDeButton.classList.remove("active");
        }
    });
});

// Button cuộn lên đầu trang
// Show the button when scrolling down
window.onscroll = function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
    ) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to the top when button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const messageEl = document.getElementById("formMessage");

    // Nếu không có form trên trang hiện tại, bỏ qua
    if (!form) return;

    // Biến để quản lý timeout xóa thông báo lỗi
    let clearErrorTimeout = null;

    // Helper: hiển thị thông báo (type = 'error' hoặc 'success')
    function showMessage(text, type) {
        if (!messageEl) return;
        // Hủy timeout cũ nếu có (để tránh xung đột)
        if (clearErrorTimeout) {
            clearTimeout(clearErrorTimeout);
            clearErrorTimeout = null;
        }

        messageEl.textContent = text;
        messageEl.className = `form-message ${type}`;

        // Nếu là lỗi -> tự động xóa thông báo sau 3s (yêu cầu của bạn)
        if (type === "error") {
            clearErrorTimeout = setTimeout(() => {
                // Xóa thông báo và reset class
                messageEl.textContent = "";
                messageEl.className = "form-message";
                clearErrorTimeout = null;
            }, 3000);
        } else {
            // Nếu success, có thể xóa sau 2s (tuỳ chọn) hoặc giữ tuỳ bạn
            clearErrorTimeout = setTimeout(() => {
                messageEl.textContent = "";
                messageEl.className = "form-message";
                clearErrorTimeout = null;
            }, 2500);
        }
    }

    // Helper: tìm và focus ô trống đầu tiên
    function focusFirstEmptyField(fields) {
        for (const el of fields) {
            if (!el.value.trim()) {
                el.focus();
                return;
            }
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Ngăn reload trang

        // Lấy giá trị và các phần tử (DOM)
        const nameEl = document.getElementById("name");
        const emailEl = document.getElementById("email");
        const phoneEl = document.getElementById("phone");
        const subjectEl = document.getElementById("subject");
        const messageTextareaEl = document.getElementById("message");

        // an toàn: nếu bất kỳ phần tử nào không tồn tại thì dừng
        if (!nameEl || !emailEl || !phoneEl || !subjectEl || !messageTextareaEl) {
            console.warn("Một hoặc nhiều trường form không tồn tại trên trang.");
            return;
        }

        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const phone = phoneEl.value.trim();
        const subject = subjectEl.value.trim();
        const message = messageTextareaEl.value.trim();

        // Kiểm tra trống: nếu có ô trống -> báo lỗi và focus ô đầu tiên trống
        if (!name || !email || !phone || !subject || !message) {
            showMessage(
                "Vui lòng điền đầy đủ tất cả các thông tin trước khi gửi!",
                "error"
            );
            focusFirstEmptyField([
                nameEl,
                emailEl,
                phoneEl,
                subjectEl,
                messageTextareaEl,
            ]);
            return;
        }

        // (Tuỳ chọn) kiểm tra email đơn giản (regex cơ bản)
        const emailSimpleRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailSimpleRegex.test(email)) {
            showMessage("Vui lòng nhập địa chỉ Email hợp lệ.", "error");
            emailEl.focus();
            return;
        }

        // Nếu hợp lệ: hiển thị success
        showMessage(
            "Thông tin của bạn đã được ghi nhận. Cảm ơn bạn đã liên hệ!",
            "success"
        );

        // Hủy timeout lỗi nếu còn
        if (clearErrorTimeout) {
            clearTimeout(clearErrorTimeout);
            clearErrorTimeout = null;
        }

        // Xử lý thêm: ví dụ gửi AJAX lên server ở đây (nếu cần)
        // fetch('/api/contact', { method: 'POST', body: new FormData(form) }).then(...)

        // Reset form sau một thời gian ngắn để người dùng thấy thông báo
        setTimeout(() => {
            form.reset();
        }, 1500);
    });
});