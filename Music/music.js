document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggle-button");
    const sidebar = document.getElementById("siderbar");

    // Gom tất cả các phần sẽ dịch chuyển vào 1 mảng
    const moveElements = [
        document.querySelector(".background"),
        document.getElementById("thanhKhoaHoc"),
        document.getElementById("timKhoaHoc"),
        document.getElementById("tieuDeKhoaHoc"),
        document.getElementById("noiDungKhoaHoc"),
        document.getElementById("pageFooter"),
        document.getElementById("pageFooterContent"),
        document.getElementById("MainContent"),
        document.getElementById("MusicGrid"),
    ];

    toggleButton.addEventListener("click", function() {
        sidebar.classList.toggle("sidebar-hidden");
        toggleButton.classList.toggle("a-move-left");

        // Dịch chuyển tất cả phần tử trong mảng
        moveElements.forEach((el) => {
            if (el) el.classList.toggle("move-text-left");
        });
    });
});

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