import { listElement, nameInputElement,textAreaElement,buttonElement } from "./hw9.js";
import { initEventlikes } from "./likeFunction.js";
import { reply } from "./replyToComments.js";
import {  buttonDisabled } from "./validation.js";

export const renderList = ({commentsArr}) => {
  
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
    .join("");
    
  listElement.innerHTML = commentHtml;
  initEventlikes();
  reply();
  buttonDisabled();

  const appElement = document.getElementById("app");
  const appHtml = `<div class="container">
  <ul id="list" class="comments">
    
  </ul>
  <div class="add-form">
    <input type="text" id="name-input" class="add-form-name" placeholder="Введите ваше имя" />
    <textarea type="textarea" id="textarea-input" class="add-form-text" placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button type="submit" id="write-button" class="add-form-button">Написать</button>
    </div>
  </div>
  <div class="input-form"></div>
</div>
</div>`

  appElement.innerHTML = appHtml;

};

