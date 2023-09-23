const buttonElement = document.getElementById("write-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textAreaElement = document.getElementById("textarea-input");
const blockWithForms = document.querySelector(".add-form");
let comments = document.querySelector('.comments');

let initEventlikes = () => {

  let likeButtons = Array.from(document.querySelectorAll('.like-button'));
  let likeCounts = Array.from(document.querySelectorAll('.likes-counter'));

  likeButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      button.classList.toggle('-active-like');
      const current = Number(likeCounts[index].innerHTML);
      const increase = button.classList.contains('-active-like') ? 1 : -1;
      likeCounts[index].innerHTML = current + increase;
    });
  });
};

const reply = () => {

  const commentList = document.querySelectorAll('.comment');
  commentList.forEach((comment, index) => {
    comment.addEventListener('click', () => {
      const index = comment.dataset.index;
      let textName = commentsArr[index].name;
      let textItem = commentsArr[index].comment;

      textAreaElement.value = textItem + '\n' + textName + ' :';

    });
  })
}

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

let commentsArr = [];

const getComments = () => {

  let fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/eugene-sokolov/comments", {
    method: "GET",
  });

  fetchPromise.then((response) => {
    response.json().then((responseData) => {
      let appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          comment: comment.text,
          date: new Date(comment.date).toLocaleString(),
          likes: comment.likes,
        }
      });

      commentsArr = appComments;
      console.log(responseData);
      
      renderList();
    });
  });
}

getComments();

const renderList = () => {

  const commentHtml = commentsArr.map((comment, index) => {
    return `<li class="comment" data-index="${index}">
<div class="comment-header">
  <div class="commentersName" data-index="${index}">${comment.name}</div>
  <div>${comment.date}</div>
</div>
<div class="comment-body">
  <div class="comment-text" data-index="${index}">
    ${comment.comment}
  </div>
</div>
<div class="comment-footer">
  <div class="likes">
    <span  class="likes-counter">${comment.likes}</span>
    <button class="like-button"></button>
  </div>
</div>
</li>`
  })
    .join("")

  listElement.innerHTML = commentHtml;

  initEventlikes();
  reply();

};

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

  commentsArr.push({
    name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    comment: textAreaElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    likes: 0,
    date: formatDate(myDate),
    
  });

  let fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/eugene-sokolov/comments", {
    method: "POST",
    body: JSON.stringify({
      text: textAreaElement.value,
      name: nameInputElement.value,
    }),
});

//getComments();

/*fetchPromise.then((response) => {
  response.json().then((responseData) => {

   let appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        comment: comment.text,
        date: formatDate(),
        likes: comment.likes,
      }
    });

    commentsArr = appComments;
    renderList();
    
  });
  });*/

  initEventlikes();
  
  nameInputElement.value = ""
  textAreaElement.value = ""
  buttonDisabled();
  renderList();
  
};

const buttonDisabled = () => {
  if (nameInputElement.value === "" || textAreaElement.value === "") {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const pressEnter = (event) => {
  if (event.code === "Enter") {
    addComment();
  }
};

nameInputElement.addEventListener("input", buttonDisabled);
textAreaElement.addEventListener("input", buttonDisabled);

buttonElement.addEventListener("click", addComment);

blockWithForms.addEventListener("keyup", pressEnter);
buttonDisabled();

