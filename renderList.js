import { listElement } from "./hw9.js";
import { initEventlikes } from "./likeFunction.js";
import { reply } from "./replyToComments.js";

export const renderList = ({ commentsArr}) => {

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
  };