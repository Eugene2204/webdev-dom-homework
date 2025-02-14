const host = "https://wedev-api.sky.pro/api/v2/eugene-sokolov/comments";
const userHost = "https://wedev-api.sky.pro/api/user/login";
const userHostReg =  "https://wedev-api.sky.pro/api/user";
export let token;
export const setToken = (newToken) => {
    token = newToken;
}

export function getCommentsApi() {

    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                throw new Error("нет интернета");
            }
            console.warn(error);
        });
}

export function postComments({ text, name }) {
    return fetch(host, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
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
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                throw new Error("нет интернета");
            }
            console.warn(error);
        });

}

export function loginAvtorization({ login, password }) {
    return fetch(userHost, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
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
        });
}

export function userRegistration({ login, name, password }) {
    return fetch(userHostReg, {
        method: "POST",
        body: JSON.stringify({
            name,
            login,
            password,
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

    })
}
