const buttonElement = document.getElementById("write-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textAreaElement = document.getElementById("textarea-input");
const blockWithForms = document.querySelector(".add-form");

let initEventlikes = () => {

  let likeButtons = Array.from(document.querySelectorAll('.like-button'));
  let likeCounts = Array.from(document.querySelectorAll('.likes-counter'));

  likeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      button.classList.toggle('-active-like');
      const current = Number(likeCounts[index].innerHTML);
      const increase = button.classList.contains('-active-like') ? 1 : -1;
      likeCounts[index].innerHTML = current + increase;
    });
  });
}

document.querySelector('.container').addEventListener('click', function (event) {
  let textItem = event.target.closest('.comment-text');

  if (textItem) {
    document.querySelector('.add-form-text').value = textItem.textContent;
  }
});

const addComment = () => {

  nameInputElement.classList.remove("error");
  textAreaElement.classList.remove("error");

  if (nameInputElement.value === "" || nameInputElement.value === " ") {
    nameInputElement.classList.add("error");
    return
  } else if (textAreaElement.value === "" || textAreaElement.value === " ") {
    textAreaElement.classList.add("error");
    return
  }

  const saveInputName = nameInputElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
  const saveInputText = textAreaElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const oldListHtml = listElement.innerHTML
  listElement.innerHTML = oldListHtml + `<li class="comment">
          <div class="comment-header">
            <div>${saveInputName}</div>
            <div>${formatDate(myDate)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${saveInputText}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span  class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li>`

  initEventlikes();

  nameInputElement.value = ""
  textAreaElement.value = ""
  buttonDisabled();
};

initEventlikes();

let myDate = new Date();
function formatDate(date) {

  let day = date.getDate()
  day = day < 10 ? `0` + day : day;
  let month = date.getMonth(date.setMonth(9));
  month = month < 10 ? `0` + month : month;
  let year = date.getFullYear();
  year = year < 10 ? year = `0` + year : year;
  year = year.toString().slice(-2);
  let hours = date.getHours();
  hours = hours < 10 ? hours = `0` + hours : hours;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? minutes = `0` + minutes : minutes;

  let fullDate = `${day}` + `:${month}` + `.${year}` + ` ${hours}` + `:${minutes}`;

  return fullDate
}

const buttonDisabled = () => {
  if (nameInputElement.value === "" || textAreaElement.value === "") {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

const pressEnter = (event) => {
  if (event.code === "Enter") {
    addComment();
  }
}

nameInputElement.addEventListener("input", buttonDisabled);
textAreaElement.addEventListener("input", buttonDisabled);

buttonElement.addEventListener("click", addComment);

blockWithForms.addEventListener("keyup", pressEnter);
buttonDisabled();



