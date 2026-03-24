document.addEventListener("DOMContentLoaded", function () {
  // Cấu hình mã khóa học (thay "khoa1" cho từng file của 8 khóa)
  const COURSE_ID = "khoa5";

  //  Tên CSDL tổng
  const DB_KEY = "coursesDB";

  //  Lấy toàn bộ dữ liệu
  let coursesDB = JSON.parse(localStorage.getItem(DB_KEY)) || {};
  if (!coursesDB[COURSE_ID]) coursesDB[COURSE_ID] = {};

  let progress = coursesDB[COURSE_ID];

  //  Liên kết các phần tử DOM
  const gioiThieu = document.getElementById("gioiThieuBaiGiang");
  const danhSach = document.getElementById("dataTongle2");
  const noiDungBtn = document.querySelector(".noi-dung-bai-giang");
  const danhSachBtn = document.querySelector(".danh-sach-bai-giang");
  const trangTruocSau = document.getElementById("trang-dieu-huong");
  const videoFrame = document.getElementById("videoFrame");
  const videoList = document.querySelectorAll("#videoList li");
  const nextBtn = document.querySelector(".trang-sau button");
  const prevBtn = document.querySelector(".trang-truoc button");
  const progressDisplay = document.getElementById("progressDisplay");

  let currentIndex = 0;

  //  Chuyển giữa phần giới thiệu và danh sách
  function toggleSections(section) {
    const showDanhSach = section === "danhSach";
    gioiThieu.style.display = showDanhSach ? "none" : "block";
    danhSach.style.display = showDanhSach ? "block" : "none";
    danhSachBtn.style.display = showDanhSach ? "none" : "block";
    noiDungBtn.style.display = showDanhSach ? "block" : "none";
    trangTruocSau.style.display = showDanhSach ? "block" : "none";
    if (progressDisplay)
      progressDisplay.style.display = showDanhSach ? "block" : "none";
  }

  if (danhSachBtn)
    danhSachBtn.addEventListener("click", () => toggleSections("danhSach"));
  if (noiDungBtn)
    noiDungBtn.addEventListener("click", () => toggleSections("gioiThieu"));

  const params = new URLSearchParams(window.location.search);
  toggleSections(params.has("openDanhSach") ? "danhSach" : "gioiThieu");

  //  Chọn video
  videoList.forEach((item, index) => {
    item.addEventListener("click", () => selectVideo(index));
  });
  if (videoList.length > 0) selectVideo(0);

  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      if (currentIndex < videoList.length - 1) selectVideo(currentIndex + 1);
    });

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) selectVideo(currentIndex - 1);
    });

  //  Chọn video
  function selectVideo(index) {
    currentIndex = index;
    const url = videoList[index].getAttribute("data-url");
    const videoId = new URL(url).searchParams.get("v");
    const embedUrl = "https://www.youtube.com/embed/" + videoId;
    videoFrame.src = embedUrl;
    updateSelected();
    simulateVideoProgress(index);
  }

  //  Cập nhật trạng thái chọn
  function updateSelected() {
    videoList.forEach((li) => li.classList.remove("active"));
    videoList[currentIndex].classList.add("active");
  }

  //  Giả lập tiến độ (tự đánh dấu hoàn thành khi xem >80%)
  function simulateVideoProgress(index) {
    // Kiểm tra nếu iframe đã có video
    const player = new YT.Player("videoFrame", {
      events: {
        onReady: (event) => {
          const duration = event.target.getDuration();
          if (!duration || duration === 0) {
            // fallback nếu video chưa load được → đánh dấu sau 10s
            setTimeout(() => markCompleted(index), 10000);
            return;
          }
          // thời gian đạt 80%
          const targetTime = duration * 0.8;
          const checkInterval = setInterval(() => {
            const currentTime = event.target.getCurrentTime();
            if (currentTime >= targetTime) {
              clearInterval(checkInterval);
              markCompleted(index);
            }
          }, 1000);
        },
      },
    });
  }

  //  Đánh dấu hoàn thành
  function markCompleted(index) {
    if (!progress[index]) {
      progress[index] = true;
      coursesDB[COURSE_ID] = progress;
      localStorage.setItem(DB_KEY, JSON.stringify(coursesDB));
    }
    videoList[index].classList.add("completed");
    updateProgressDisplay();
  }

  //  Hiển thị tiến độ
  function updateProgressDisplay() {
    const total = videoList.length;
    const done = Object.keys(progress).length;
    if (progressDisplay) {
      if (done >= total && total > 0) {
        progressDisplay.textContent = `Hoàn thành ${total} bài học!`;
      } else {
        progressDisplay.textContent = `Tiến độ: ${done}/${total} bài`;
      }
    }
  }

  //  Khôi phục tiến độ
  Object.keys(progress).forEach((i) => {
    if (videoList[i]) videoList[i].classList.add("completed");
  });
  updateProgressDisplay();
});
