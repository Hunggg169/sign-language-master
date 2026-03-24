const songsPerPage = 20;
let currentPage = 1;
let allSongs = [];

fetch("lofi_data.json")
    .then((response) => response.json())
    .then((data) => {
        allSongs = data.songs;
        renderPage(currentPage);
    })
    .catch((err) => console.error("Không tải được danh sách nhạc:", err));

function renderPage(page) {
    const container = document.getElementById("music-container");
    container.innerHTML = "";

    const start = (page - 1) * songsPerPage;
    const end = start + songsPerPage;
    const songsToDisplay = allSongs.slice(start, end);

    songsToDisplay.forEach((song) => {
        const track = document.createElement("div");
        track.classList.add("track");
        track.innerHTML = `
      <div class="track-info">
        <h3>${song.name}</h3>
      </div>
      <audio controls>
        <source src="${song.path}" type="audio/mpeg">
      </audio>
    `;
        container.appendChild(track);
    });

    // Cập nhật thông tin phân trang
    const pageInfo = document.getElementById("page-info");
    const totalPages = Math.ceil(allSongs.length / songsPerPage);
    pageInfo.textContent = `Trang ${page} / ${totalPages}`;

    document.getElementById("prev-btn").disabled = page === 1;
    document.getElementById("next-btn").disabled = page === totalPages;
}

// Điều khiển nút phân trang
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    const totalPages = Math.ceil(allSongs.length / songsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
    }
});

function renderPage(page) {
    const container = document.getElementById("music-container");
    container.innerHTML = "";

    const start = (page - 1) * songsPerPage;
    const end = start + songsPerPage;
    const songsToDisplay = allSongs.slice(start, end);

    songsToDisplay.forEach((song) => {
        const track = document.createElement("div");
        track.classList.add("track");
        track.innerHTML = `
      <div class="track-info">
        <h3>${song.name}</h3>
      </div>
      <audio controls preload="none">
        <source src="${song.path}" type="audio/mpeg">
      </audio>
    `;
        container.appendChild(track);
    });

    // Cập nhật thông tin phân trang
    const pageInfo = document.getElementById("page-info");
    const totalPages = Math.ceil(allSongs.length / songsPerPage);
    pageInfo.textContent = `Trang ${page} / ${totalPages}`;

    document.getElementById("prev-btn").disabled = page === 1;
    document.getElementById("next-btn").disabled = page === totalPages;

    // Reset tất cả audio để tránh bị "đang chạy ảo"
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });
}