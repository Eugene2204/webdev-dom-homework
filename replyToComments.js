import { commentsArr } from "./hw9.js";

export const reply = () => {
    const textAreaElement = document.getElementById("textarea-input");
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
