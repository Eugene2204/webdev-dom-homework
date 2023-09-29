export function getCommentsApi() {
    return fetch("https://wedev-api.sky.pro/api/v1/eugene-sokolov/comments", {
        method: "GET",
    })

        .then((response) => {
            return response.json();
        })
}



export function postComments({ text, name }) {
    return fetch("https://wedev-api.sky.pro/api/v1/eugene-sokolov/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
        }),
    })

        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер упал');
            }
            if (response.status === 400) {
                throw new Error('Неверные данные ввода');
            }
            if (response.status === 201) {
                return response.json();
            }
            /*if (response.status === ) {
                throw new Error("нет интернета");
              }*/
        })
}