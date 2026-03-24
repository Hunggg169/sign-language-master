document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-button");
  const sidebar = document.getElementById("siderbar");
  const background = document.querySelector(".background");
  const questionButton = document.querySelector(".dat-cau-hoi button");
  const questionForm = document.getElementById("questionForm");

  const elementsToMove = [
    "thanhKhoaHoc",
    "timKhoaHoc",
    "tieuDeKhoaHoc",
    "noiDungKhoaHoc",
    "pageFooter",
    "pageFooter2",
  ].map((id) => document.getElementById(id));

  // Toggle Sidebar
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      if (sidebar) sidebar.classList.toggle("sidebar-hidden");
      toggleButton.classList.toggle("a-move-left");
      if (background) background.classList.toggle("move-text-left");
      elementsToMove.forEach((el) => {
        if (el) el.classList.toggle("move-text-left");
      });
    });
  }

  // Toggle Forms
  setupToggle("toggle-pencil2", ".hide-pencil2");
  setupToggle("toggle-notification2", ".notification2-2");
  setupToggle("toggle-user-acount", ".hide-user-acount");

  // Question Form
  if (questionButton) {
    questionButton.addEventListener("click", () => {
      if (questionForm) questionForm.style.display = "block";
    });
  }

  window.closeForm = () => {
    if (questionForm) questionForm.style.display = "none";
  };

  // Progress bar
  setupCourseProgress();
});

/* SEARCH WRAPPER */
function toggleSearchWrapper() {
  const searchWrapper = document.getElementById("searchWrapper");
  const sidebar = document.getElementById("siderbar");

  if (!searchWrapper) return;

  const isVisible =
    searchWrapper.style.display === "flex" ||
    searchWrapper.classList.contains("active");

  if (!isVisible) {
    searchWrapper.style.display = "flex";
    if (sidebar && !sidebar.classList.contains("sidebar-hidden")) {
      searchWrapper.style.marginLeft = "220px";
    } else {
      searchWrapper.style.marginLeft = "0";
    }
  } else {
    hideSearchWrapper();
  }
}

function hideSearchWrapper() {
  const searchWrapper = document.getElementById("searchWrapper");
  if (searchWrapper) {
    searchWrapper.style.display = "none";
    searchWrapper.style.marginLeft = "0";
  }
}

/* Setup toggle panels */
function setupToggle(btnId, targetSelector) {
  const btn = document.getElementById(btnId);
  const panel = document.querySelector(targetSelector);

  if (!btn || !panel) return;

  btn.addEventListener("click", function () {
    panel.classList.toggle("active");
  });
}

/* Scroll to top */
window.onscroll = function () {
  const btn = document.getElementById("scrollToTopBtn");
  if (btn) {
    btn.style.display =
      document.documentElement.scrollTop > 100 ? "block" : "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Progress System */
function setupCourseProgress() {
  const DB_KEY = "coursesDB";
  const coursesDB = JSON.parse(localStorage.getItem(DB_KEY)) || {};
  const courses = document.querySelectorAll(".row1-list");

  courses.forEach((course) => {
    const key = course.getAttribute("data-khoa");
    const total = parseInt(course.getAttribute("data-total"));
    const learnedKeys = coursesDB[key] ? Object.keys(coursesDB[key]).length : 0;

    const completed = Math.min(learnedKeys, total);
    const percent = Math.round((completed / total) * 100);

    course.insertAdjacentHTML(
      "beforeend",
      `
        <div class="progress-container">
            <div class="progress-fill" style="width:${percent}%"></div>
        </div>
        <div class="progress-label">
            ${percent}% (${completed}/${total})
        </div>
      `
    );

    if (percent >= 100) {
      course.style.border = "3px solid #00e676";
      course.style.boxShadow = "0 0 10px #00e676";
    }
  });
}
