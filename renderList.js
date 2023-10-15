import { initEventlikes } from "./likeFunction.js";
import { reply } from "./replyToComments.js";
import {  buttonDisabled } from "./validation.js";
import { addComment, pressEnter } from "./hw9.js";
import {renderLogin} from "./loginPage.js";
import {token} from "./api.js";

export const renderList = ({commentsArr}) => {

  const commentsHTML = commentsArr.map((comment, index) => {
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
    .join("");

  const appElement = document.getElementById("app");

  const appHtml = `<div class="container">
    <ul id="list" class="comments">
      ${commentsHTML}
    </ul>
    <div class="add-form">
      <input type="text" id="name-input" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea type="textarea" id="textarea-input" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button type="submit" id="write-button" class="add-form-button">Написать</button>
      </div>
    </div>
    <div class="avtorization">
          <p class="avtorization-text">Чтобы добавить комментарий, <a class="avtorization-button" href="#">Авторизуйтесь</a></p>
        </div>
    <div class="input-form"></div>
  </div>
  </div>`

  appElement.innerHTML = appHtml;

  const nameInputElement = document.getElementById("name-input");
  const textAreaElement = document.getElementById("textarea-input");
  const buttonElement = document.getElementById("write-button");
  const blockWithForms = document.querySelector(".add-form");
  const buttonLogin = document.querySelector(".avtorization-button");
  const blockAuthorization = document.querySelector(".avtorization");
  
  token ? blockAuthorization.classList.add('hidden') : blockWithForms.classList.add('hidden');
  nameInputElement.value = window.localStorage.getItem("userName");
  nameInputElement.disabled = true;
  
  buttonLogin.addEventListener('click', () => renderLogin({renderList}));
  nameInputElement.addEventListener("input", buttonDisabled);
  textAreaElement.addEventListener("input", buttonDisabled);
  buttonElement.addEventListener("click", addComment);
  blockWithForms.addEventListener("keyup", pressEnter);
  
  initEventlikes();
  reply();
  buttonDisabled();
};

