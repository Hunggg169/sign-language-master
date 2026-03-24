document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggle-button");
    const sidebar = document.getElementById("siderbar");
    const background = document.querySelector(".background");
    const thanhKhoaHoc = document.getElementById("thanhKhoaHoc");
    const timTieuDeKhoaHoc = document.getElementById("tieuDeKhoaHoc");
    const pageFooter = document.getElementById("pageFooter");
    const pageFooter2 = document.getElementById("pageFooter2");

    toggleButton.addEventListener("click", function() {
        sidebar.classList.toggle("sidebar-hidden");
        toggleButton.classList.toggle("a-move-left");
        background.classList.toggle("move-text-left");
        thanhKhoaHoc.classList.toggle("move-text-left");
        timTieuDeKhoaHoc.classList.toggle("move-text-left");
        pageFooter.classList.toggle("move-text-left");
        pageFooter2.classList.toggle("move-text-left");
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
        if (!sidebar.classList.contains("sidebar-hidden")) {
            searchWrapper.style.marginLeft = "220px";
        } else {
            searchWrapper.style.marginLeft = "0";
        }
    } else {
        searchWrapper.style.display = "none";
        searchWrapper.style.marginLeft = "0";
    }
}

function hideSearchWrapper() {
    const searchWrapper = document.getElementById("searchWrapper");
    searchWrapper.style.display = "none";
    searchWrapper.style.marginLeft = "0";
}

// Hiện ra Pencil2
document.addEventListener("DOMContentLoaded", function() {
    const togglePencilButton = document.getElementById("toggle-pencil2");
    const hidePencil2 = document.querySelector(".hide-pencil2");
    togglePencilButton.addEventListener("click", function() {
        hidePencil2.classList.toggle("active");
    });
});

// Hiện ra Notification2
document.addEventListener("DOMContentLoaded", function() {
    const toggleNotification = document.getElementById("toggle-notification2");
    const hideNotification = document.querySelector(".notification2-2");
    toggleNotification.addEventListener("click", function() {
        hideNotification.classList.toggle("active");
    });
});

// Hiện ra User Account
document.addEventListener("DOMContentLoaded", function() {
    const toggleUserAcount = document.getElementById("toggle-user-acount");
    const hideUserAcount = document.querySelector(".hide-user-acount");
    toggleUserAcount.addEventListener("click", function() {
        hideUserAcount.classList.toggle("active");
    });
});

// Hiện form đặt câu hỏi
document.addEventListener("DOMContentLoaded", function() {
    const questionButton = document.querySelector(".dat-cau-hoi button");
    const questionForm = document.getElementById("questionForm");
    questionButton.addEventListener("click", function() {
        questionForm.style.display = "block";
    });
    window.closeForm = function() {
        questionForm.style.display = "none";
    };
});

// Chủ đề
document.addEventListener("DOMContentLoaded", function() {
    const chuDeButton = document.querySelector(".tieu-de-phai-btn:first-child");
    chuDeButton.addEventListener("click", function() {
        chuDeButton.classList.toggle("active");
    });
    document.addEventListener("click", function(event) {
        if (!chuDeButton.contains(event.target)) {
            chuDeButton.classList.remove("active");
        }
    });
});

// Nút cuộn lên đầu trang
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

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// PHẦN CAMERA & UPLOAD ẢNH (ĐÃ CẢI TIẾN)

let cameraStream = null;
let capturedImage = null;

// Hiển thị / ẩn camera container
function toggleCamera() {
    const cameraContainer = document.getElementById("camera-container");
    cameraContainer.style.display =
        cameraContainer.style.display === "none" ? "block" : "none";
}

// Bật camera
async function openCamera() {
    const video = document.getElementById("camera");
    const img = document.getElementById("imagePreview");
    const fileInput = document.getElementById("fileInput");

    img.style.display = "none";
    video.style.display = "block";
    fileInput.value = "";
    capturedImage = null; // reset ảnh cũ

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = cameraStream;
    } catch (error) {
        alert("Không thể mở camera: " + error.message);
    }
}

// Chọn ảnh từ máy
function uploadImage() {
    document.getElementById("fileInput").click();
}

// Hiển thị ảnh sau khi chọn
function showPreview(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("camera").style.display = "none";
        const img = document.getElementById("imagePreview");
        img.src = e.target.result;
        img.style.display = "block";
        capturedImage = e.target.result;
        console.log("Ảnh mới được chọn, model sẽ chạy lại.");
    };
    reader.readAsDataURL(file);
}

// Gửi ảnh đến Flask
async function sendImage() {
    const video = document.getElementById("camera");
    const resultText = document.getElementById("result");
    const canvas = document.createElement("canvas");

    // Nếu đang bật camera thì chụp ảnh mới
    if (video.style.display === "block" && cameraStream) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        capturedImage = canvas.toDataURL("image/jpeg");
    }

    if (!capturedImage) {
        alert("Vui lòng chụp hoặc tải ảnh trước khi gửi!");
        return;
    }

    // Reset kết quả cũ & hiển thị tiến trình
    resultText.innerText = "⏳ Đang phân tích ảnh mới...";

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: capturedImage }),
        });

        const result = await response.json();

        if (result.prediction) {
            resultText.innerText = "Kết quả: " + result.prediction;
        } else if (result.error) {
            resultText.innerText = "Lỗi từ server: " + result.error;
        } else {
            resultText.innerText = "Không nhận được kết quả!";
        }
    } catch (error) {
        console.error("Lỗi khi gửi ảnh:", error);
        resultText.innerText = "Lỗi khi gửi ảnh: " + error.message;
    }
}