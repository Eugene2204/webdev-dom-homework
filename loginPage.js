import { login, setToken, token } from "./api.js"
import { commentsArr} from "./hw9.js";
//import { renderForm } from "./renderList.js";

export const renderLogin = ({renderList}) => {
    const appElement = document.getElementById("app");
    const loginHtml = `<div class="container">
        <div class="add-form">
            <h1>Форма входа</h1>
            <input type="text" id="login-name-input" class="add-form-text" placeholder="Введите ваше имя" />
            <input type="text" id="password-input" class="add-form-text" placeholder="Введите пароль" />
            <div class="add-form-row">
                <button type="submit" id="authorization-form" class="add-form-button button_login-page">Войти</button>
            </div>
            <a class="line_login-page" href="#">Зарегистрироваться</a>
        </div>`
        appElement.innerHTML = loginHtml;
        
        const buttonElementLogin = document.getElementById('authorization-form');
        const loginInputElement = document.getElementById('login-name-input');
        const passwordInputElement = document.getElementById('password-input');
        
        buttonElementLogin.addEventListener("click", () => {
            login({
                login: loginInputElement.value,
                password: passwordInputElement.value
            })
                .then((responseData) => {
                    setToken(responseData.user.token);
                    console.log(token);
                })
                .then (() => {
                    renderList({commentsArr});
                    
                    
                })
        });
}