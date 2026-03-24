document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch(
    "http://localhost/Sign_Language_Master/Forgotpassword/forgotpassword.php",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.text())
    .then((data) => {
      alert(data); // Hiện thông báo (có thể thay bằng UI đẹp hơn)
    })
    .catch((error) => {
      alert("Đã xảy ra lỗi: " + error);
    });
});
