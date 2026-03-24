const sendBtn = document.getElementById("sendBtn");
const questionInput = document.getElementById("questionInput");
const qaList = document.getElementById("qaList");

sendBtn.addEventListener("click", () => {
    const question = questionInput.value.trim();
    if (question === "") return alert("Vui lòng nhập câu hỏi!");

    const qaItem = document.createElement("div");
    qaItem.classList.add("qa-item");

    qaItem.innerHTML = `
        <div class="question">${question}</div>
        <div class="answer">Cảm ơn bạn! Chúng tôi sẽ sớm trả lời câu hỏi này.</div>
      `;

    qaList.prepend(qaItem);
    questionInput.value = "";
});