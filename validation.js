export  const addCommentValidation = () => {
    const nameInputElement = document.getElementById("name-input");
    const textAreaElement = document.getElementById("textarea-input");

    nameInputElement.classList.remove("error");
    textAreaElement.classList.remove("error");

    if (nameInputElement.value === "" || nameInputElement.value === " ") {
      nameInputElement.classList.add("error");
    } else if (textAreaElement.value === "" || textAreaElement.value === " ") {
      textAreaElement.classList.add("error");
    }
 }

export const buttonDisabled = () => {
    const nameInputElement = document.getElementById("name-input");
    const textAreaElement = document.getElementById("textarea-input");
    const buttonElement = document.getElementById("write-button");

  if (nameInputElement.value === "" || textAreaElement.value === "") {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};
