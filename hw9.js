const buttonElement = document.getElementById("write-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textAreaElement = document.getElementById("textarea-input");

const likeButton = document.getElementById('like-counter');
const likeCount = document.getElementById('like-count');

likeButton.addEventListener('click', () => {
  const currentCount = parseInt(likeCount.textContent, 10);
  likeCount.textContent = currentCount + 1;
  return likeButton
});

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

buttonElement.addEventListener("click", () => {

  nameInputElement.classList.remove("error");
  textAreaElement.classList.remove("error");

  if (nameInputElement.value === "" || nameInputElement.value === " ") {
    nameInputElement.classList.add("error");
    return
  } else if (textAreaElement.value === "" || textAreaElement.value === " ") {
    textAreaElement.classList.add("error");
    return
  } 
  
  const oldListHtml = listElement.innerHTML
  listElement.innerHTML = oldListHtml + `<li class="comment">
          <div class="comment-header">
            <div>${nameInputElement.value}</div>
            <div>${formatDate(myDate)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${textAreaElement.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span id="like-count" class="likes-counter">0</span>
              <button id="like-counter" class="like-button"></button>
            </div>
          </div>
        </li>`
});

