export const initEventlikes = () => {

    const likeButtons = document.querySelectorAll('.like-button');
    const likeCounts = document.querySelectorAll('.likes-counter');
  
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