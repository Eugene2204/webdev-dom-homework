import { getCommentsApi, postComments, } from "./api.js";
import { renderList } from "./renderList.js";
import { formatDate } from "./myDate.js";
import { buttonDisabled, addCommentValidation } from "./validation.js";

export const buttonElement = document.getElementById("write-button");
export const listElement = document.getElementById("list");
export const nameInputElement = document.getElementById("name-input");
export const textAreaElement = document.getElementById("textarea-input");
const blockWithForms = document.querySelector(".add-form");
const formInput = document.querySelector(".input-form");

let myDate = new Date();

export let commentsArr = [];
listElement.textContent = "Пожалуйста подождите,коммнтарии загружаются";
const getComments = () => {

  getCommentsApi().then((responseData) => {
    let appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        comment: comment.text,
        date: new Date(comment.date).toLocaleString(),
        likes: comment.likes,
      }
    })
    
    commentsArr = appComments;
    renderList({ commentsArr});
  })
}

getComments();

const addComment = () => {

  addCommentValidation();

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

  blockWithForms.classList.add('hidden');
  formInput.textContent = "Добавляем комментарий...";

  postComments({
    text: textAreaElement.value,
    name: nameInputElement.value,
  }).then(() => {
    return getComments();
  })

    .then(() => {
      blockWithForms.classList.remove('hidden');
      formInput.textContent = "";
      nameInputElement.value = "";
      textAreaElement.value = "";
    })

    .catch((error) => {
      blockWithForms.classList.remove('hidden');
      formInput.textContent = "";
      console.warn(error);
    });

  buttonDisabled();
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


