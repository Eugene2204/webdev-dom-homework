import { nameInputElement, textAreaElement, buttonElement } from "./hw9.js";

export  const addCommentValidation = () => {
    nameInputElement.classList.remove("error");
    textAreaElement.classList.remove("error");
  
    if (nameInputElement.value === "" || nameInputElement.value === " ") {
      nameInputElement.classList.add("error");
    } else if (textAreaElement.value === "" || textAreaElement.value === " ") {
      textAreaElement.classList.add("error");
    }
 }
 
export const buttonDisabled = () => {
  if (nameInputElement.value === "" || textAreaElement.value === "") {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};




      