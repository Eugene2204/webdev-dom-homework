import { getCommentsApi, postComments, } from "./api.js";
import { renderList } from "./renderList.js";
import { formatDate } from "./myDate.js";
import { addCommentValidation } from "./validation.js";

let myDate = new Date();

export let commentsArr = [];

export const getComments = () => {
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
    renderList({commentsArr});
  })
}
getComments();

export const addComment = () => {
  const nameInputElement = document.getElementById("name-input");
  const textAreaElement = document.getElementById("textarea-input");
  const blockWithForms = document.querySelector(".add-form");
  const formInput = document.querySelector(".input-form");

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
  };

export const pressEnter = (event) => {
  if (event.code === "Enter") {
    addComment();
  }
};
