/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCommentsApi: () => (/* binding */ getCommentsApi),\n/* harmony export */   loginAvtorization: () => (/* binding */ loginAvtorization),\n/* harmony export */   postComments: () => (/* binding */ postComments),\n/* harmony export */   setToken: () => (/* binding */ setToken),\n/* harmony export */   token: () => (/* binding */ token),\n/* harmony export */   userRegistration: () => (/* binding */ userRegistration)\n/* harmony export */ });\nconst host = \"https://wedev-api.sky.pro/api/v2/eugene-sokolov/comments\";\nconst userHost = \"https://wedev-api.sky.pro/api/user/login\";\nconst userHostReg =  \"https://wedev-api.sky.pro/api/user\";\nlet token;\nconst setToken = (newToken) => {\n    token = newToken;\n}\n\nfunction getCommentsApi() {\n\n    return fetch(host, {\n        method: \"GET\",\n        headers: {\n            Authorization: `Bearer ${token}`,\n        },\n    })\n\n        .then((response) => {\n            return response.json();\n        })\n        .catch((error) => {\n            if (error.message === 'Failed to fetch') {\n                throw new Error(\"нет интернета\");\n            }\n            console.warn(error);\n        });\n}\n\nfunction postComments({ text, name }) {\n    return fetch(host, {\n        method: \"POST\",\n        headers: {\n            Authorization: `Bearer ${token}`,\n        },\n        body: JSON.stringify({\n            text: text,\n            name: name,\n        }),\n    })\n    \n        .then((response) => {\n            if (response.status === 500) {\n                throw new Error('Сервер упал');\n            }\n            if (response.status === 400) {\n                throw new Error('Неверные данные ввода');\n            }\n            if (response.status === 201) {\n                return response.json();\n            }\n\n        })\n        .catch((error) => {\n            if (error.message === 'Failed to fetch') {\n                throw new Error(\"нет интернета\");\n            }\n            console.warn(error);\n        });\n\n}\n\nfunction loginAvtorization({ login, password }) {\n    return fetch(userHost, {\n        method: \"POST\",\n        body: JSON.stringify({\n            login,\n            password,\n        }),\n    })\n    \n        .then((response) => {\n            if (response.status === 500) {\n                throw new Error('Сервер упал');\n            }\n            if (response.status === 400) {\n                throw new Error('Неверные данные ввода');\n            }\n            if (response.status === 201) {\n                return response.json();\n            }\n\n        })\n        .catch((error) => {\n            if (error.message === 'Failed to fetch') {\n                throw new Error(\"нет интернета\");\n            }\n            console.warn(error);\n        });\n\n}\n\nfunction userRegistration({ login, name, password }) {\n    return fetch(userHostReg, {\n        method: \"POST\",\n        body: JSON.stringify({\n            name,\n            login,\n            password,\n        }),\n    })\n\n        .then((response) => {\n            if (response.status === 500) {\n                throw new Error('Сервер упал');\n            }\n            if (response.status === 400) {\n                throw new Error('Неверные данные ввода');\n            }\n            if (response.status === 201) {\n                return response.json();\n            }\n\n        })\n        .catch((error) => {\n            if (error.message === 'Failed to fetch') {\n                throw new Error(\"нет интернета\");\n            }\n            console.warn(error);\n        });\n\n}\n\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./hw9.js":
/*!****************!*\
  !*** ./hw9.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addComment: () => (/* binding */ addComment),\n/* harmony export */   commentsArr: () => (/* binding */ commentsArr),\n/* harmony export */   getComments: () => (/* binding */ getComments),\n/* harmony export */   pressEnter: () => (/* binding */ pressEnter)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _renderList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderList.js */ \"./renderList.js\");\n/* harmony import */ var _lib_formatDate_formatDate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/formatDate/formatDate.js */ \"./lib/formatDate/formatDate.js\");\n/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation.js */ \"./validation.js\");\n\n\n\n\n//import { format } from \"date-fns\";\n\nlet myDate = new Date({formatDateToRu: _lib_formatDate_formatDate_js__WEBPACK_IMPORTED_MODULE_2__.formatDateToRu});\n\nlet commentsArr = [];\n\nconst getComments = () => {\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getCommentsApi)().then((responseData) => {\n    let appComments = responseData.comments.map((comment) => {\n      return {\n        name: comment.author.name,\n        comment: comment.text,\n        date: new Date(comment.date).toLocaleString(),\n        likes: comment.likes,\n      }\n    })\n\n    commentsArr = appComments;\n    (0,_renderList_js__WEBPACK_IMPORTED_MODULE_1__.renderList)({commentsArr});\n  })\n}\ngetComments();\n\nconst addComment = () => {\n  const nameInputElement = document.getElementById(\"name-input\");\n  const textAreaElement = document.getElementById(\"textarea-input\");\n  const blockWithForms = document.querySelector(\".add-form\");\n  const formInput = document.querySelector(\".input-form\");\n\n  (0,_validation_js__WEBPACK_IMPORTED_MODULE_3__.addCommentValidation)();\n\n  commentsArr.push({\n    name: nameInputElement.value\n      .replaceAll(\"&\", \"&amp;\")\n      .replaceAll(\"<\", \"&lt;\")\n      .replaceAll(\">\", \"&gt;\")\n      .replaceAll('\"', \"&quot;\"),\n    comment: textAreaElement.value\n      .replaceAll(\"&\", \"&amp;\")\n      .replaceAll(\"<\", \"&lt;\")\n      .replaceAll(\">\", \"&gt;\")\n      .replaceAll('\"', \"&quot;\"),\n    likes: 0,\n    date: (0,_lib_formatDate_formatDate_js__WEBPACK_IMPORTED_MODULE_2__.formatDateToRu)(myDate),\n\n  });\n\n  blockWithForms.classList.add('hidden');\n  formInput.textContent = \"Добавляем комментарий...\";\n\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postComments)({\n    text: textAreaElement.value,\n    name: nameInputElement.value,\n  }).then(() => {\n    return getComments();\n  })\n\n    .then(() => {\n      blockWithForms.classList.remove('hidden');\n      formInput.textContent = \"\";\n      nameInputElement.value = \"\";\n      textAreaElement.value = \"\";\n    })\n\n    .catch((error) => {\n      blockWithForms.classList.remove('hidden');\n      formInput.textContent = \"\";\n      console.warn(error);\n    });\n  };\n\nconst pressEnter = (event) => {\n  if (event.code === \"Enter\") {\n    addComment();\n  }\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./hw9.js?");

/***/ }),

/***/ "./lib/formatDate/formatDate.js":
/*!**************************************!*\
  !*** ./lib/formatDate/formatDate.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatDateToRu: () => (/* binding */ formatDateToRu),\n/* harmony export */   formatDateToUs: () => (/* binding */ formatDateToUs)\n/* harmony export */ });\nconst formatDateToRu = (date) => {\n\n  let day = date.getDate();\n  day = day < 10 ? `0` + day : day;\n  let month = date.getMonth(date.setMonth(9));\n  month = month < 10 ? `0` + month : month;\n  let year = date.getFullYear();\n  year = year < 10 ? year = `0` + year : year;\n  year = year.toString().slice(-2);\n  let hours = date.getHours();\n  hours = hours < 10 ? hours = `0` + hours : hours;\n  let minutes = date.getMinutes();\n  minutes = minutes < 10 ? minutes = `0` + minutes : minutes;\n\n  let fullDate = `${day}:${month}.${year} ${hours}:${minutes}`;\n\n  return fullDate;\n}\n\nconst formatDateToUs = (date) => {\n  return `${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}-${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;\n};\n\n//# sourceURL=webpack://webdev-dom-homework/./lib/formatDate/formatDate.js?");

/***/ }),

/***/ "./likeFunction.js":
/*!*************************!*\
  !*** ./likeFunction.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initEventlikes: () => (/* binding */ initEventlikes)\n/* harmony export */ });\nconst initEventlikes = () => {\n\n    const likeButtons = document.querySelectorAll('.like-button');\n    const likeCounts = document.querySelectorAll('.likes-counter');\n  \n    likeButtons.forEach((button, index) => {\n      button.addEventListener(\"click\", (e) => {\n        e.stopPropagation()\n        button.classList.toggle('-active-like');\n        const current = Number(likeCounts[index].innerHTML);\n        const increase = button.classList.contains('-active-like') ? 1 : -1;\n        likeCounts[index].innerHTML = current + increase;\n      });\n    });\n  };\n\n//# sourceURL=webpack://webdev-dom-homework/./likeFunction.js?");

/***/ }),

/***/ "./loginPage.js":
/*!**********************!*\
  !*** ./loginPage.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _hw9_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hw9.js */ \"./hw9.js\");\n/* harmony import */ var _registrationForm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registrationForm.js */ \"./registrationForm.js\");\n\n\n\n\nconst renderLogin = ({renderList}) => {\n    const appElement = document.getElementById(\"app\");\n    const loginHtml = `<div class=\"container\">\n        <div class=\"add-form\">\n            <h1>Форма входа</h1>\n            <input type=\"text\" id=\"login-name-input\" class=\"add-form-text\" placeholder=\"Введите ваше имя\" />\n            <input type=\"text\" id=\"password-input\" class=\"add-form-text\" placeholder=\"Введите пароль\" />\n            <div class=\"add-form-row\">\n                <button type=\"submit\" id=\"authorization-form\" class=\"add-form-button button_login-page\">Войти</button>\n            </div>\n            <a class=\"line_login-page\" href=\"#\">Зарегистрироваться</a>\n        </div>`\n        appElement.innerHTML = loginHtml;\n\n        const buttonRegister = document.querySelector(\".line_login-page\");\n        buttonRegister.addEventListener('click', () => (0,_registrationForm_js__WEBPACK_IMPORTED_MODULE_2__.renderRegistration)());\n\n        const buttonElementLogin = document.getElementById('authorization-form');\n        const loginInputElement = document.getElementById('login-name-input');\n        const passwordInputElement = document.getElementById('password-input');\n        \n        buttonElementLogin.addEventListener(\"click\", () => {\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.loginAvtorization)({\n                login: loginInputElement.value,\n                password: passwordInputElement.value\n            })\n                .then((responseData) => {\n                    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\n                    window.localStorage.setItem(\"userName\",responseData.user.login);\n                })\n                .then (() => {\n                    renderList({commentsArr: _hw9_js__WEBPACK_IMPORTED_MODULE_1__.commentsArr});\n                })\n        });\n        \n}\n\n\n//# sourceURL=webpack://webdev-dom-homework/./loginPage.js?");

/***/ }),

/***/ "./registrationForm.js":
/*!*****************************!*\
  !*** ./registrationForm.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderRegistration: () => (/* binding */ renderRegistration)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _hw9_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hw9.js */ \"./hw9.js\");\n/* harmony import */ var _loginPage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loginPage.js */ \"./loginPage.js\");\n/* harmony import */ var _renderList_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderList.js */ \"./renderList.js\");\n\n\n\n\n\nconst renderRegistration = () => {\n    const appElement = document.getElementById(\"app\");\n    const loginHtmlRegistr = `<div class=\"container\">\n    <div class=\"add-form\">\n        <h1>Регистрация</h1>\n        <input type=\"text\" id=\"login-name-input-registration\" class=\"add-form-text\" placeholder=\"Введите ваше имя\" />\n        <input type=\"text\" id=\"login-input-registration\" class=\"add-form-text\" placeholder=\"Введите логин\" />\n        <input type=\"text\" id=\"password-input-registration\" class=\"add-form-text\" placeholder=\"Введите пароль\" />\n        <div class=\"add-form-row\">\n            <button type=\"submit\" id=\"authorization-form-registration\"\n                class=\"add-form-button button_login-page\">Зарегистрироваться</button>\n        </div>\n        <a class=\"line_login-page\" href=\"#\">Войти</a>\n    </div>`\n    appElement.innerHTML = loginHtmlRegistr;\n\n    const buttonRegister = document.querySelector(\".line_login-page\")\n    buttonRegister.addEventListener('click', () => (0,_loginPage_js__WEBPACK_IMPORTED_MODULE_2__.renderLogin)({ renderList: _renderList_js__WEBPACK_IMPORTED_MODULE_3__.renderList }));\n\n    const buttonElementLogin = document.getElementById('authorization-form-registration');\n    const loginInputElement = document.getElementById('login-name-input-registration');\n    const loginElement = document.getElementById('login-input-registration')\n    const passwordInputElement = document.getElementById('password-input-registration');\n\n    buttonElementLogin.addEventListener(\"click\", () => {\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.userRegistration)({\n            name: loginInputElement.value,\n            login: loginElement.value,\n            password: passwordInputElement.value\n        })\n            .then((responseData) => {\n                (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\n                console.log(responseData);\n            })\n            .then(() => {\n                (0,_renderList_js__WEBPACK_IMPORTED_MODULE_3__.renderList)({ commentsArr: _hw9_js__WEBPACK_IMPORTED_MODULE_1__.commentsArr });\n            })\n    });\n}\n\n\n//# sourceURL=webpack://webdev-dom-homework/./registrationForm.js?");

/***/ }),

/***/ "./renderList.js":
/*!***********************!*\
  !*** ./renderList.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderList: () => (/* binding */ renderList)\n/* harmony export */ });\n/* harmony import */ var _likeFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./likeFunction.js */ \"./likeFunction.js\");\n/* harmony import */ var _replyToComments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replyToComments.js */ \"./replyToComments.js\");\n/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation.js */ \"./validation.js\");\n/* harmony import */ var _hw9_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hw9.js */ \"./hw9.js\");\n/* harmony import */ var _loginPage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loginPage.js */ \"./loginPage.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\n\n\n\n\n\n\nconst renderList = ({ commentsArr }) => {\n\n  const commentsHTML = commentsArr.map((comment, index) => {\n    return `<li class=\"comment\" data-index=\"${index}\">\n  <div class=\"comment-header\">\n    <div class=\"commentersName\" data-index=\"${index}\">${comment.name}</div>\n    <div>${comment.date}</div>\n  </div>\n  <div class=\"comment-body\">\n    <div class=\"comment-text\" data-index=\"${index}\">\n      ${comment.comment}\n    </div>\n  </div>\n  <div class=\"comment-footer\">\n    <div class=\"likes\">\n      <span  class=\"likes-counter\">${comment.likes}</span>\n      <button class=\"like-button\"></button>\n    </div>\n  </div>\n  </li>`\n  })\n    .join(\"\");\n\n  const appElement = document.getElementById(\"app\");\n\n  const appHtml = `<div class=\"container\">\n    <ul id=\"list\" class=\"comments\">\n      ${commentsHTML}\n    </ul>\n    <div class=\"add-form\">\n      <input type=\"text\" id=\"name-input\" class=\"add-form-name\" placeholder=\"Введите ваше имя\" />\n      <textarea type=\"textarea\" id=\"textarea-input\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\"\n        rows=\"4\"></textarea>\n      <div class=\"add-form-row\">\n        <button type=\"submit\" id=\"write-button\" class=\"add-form-button\">Написать</button>\n      </div>\n    </div>\n    <div class=\"avtorization\">\n          <p class=\"avtorization-text\">Чтобы добавить комментарий, <a class=\"avtorization-button\" href=\"#\">Авторизуйтесь</a></p>\n        </div>\n    <div class=\"input-form\"></div>\n  </div>\n  </div>`\n\n  appElement.innerHTML = appHtml;\n\n  const nameInputElement = document.getElementById(\"name-input\");\n  const textAreaElement = document.getElementById(\"textarea-input\");\n  const buttonElement = document.getElementById(\"write-button\");\n  const blockWithForms = document.querySelector(\".add-form\");\n  const buttonLogin = document.querySelector(\".avtorization-button\");\n  const blockAuthorization = document.querySelector(\".avtorization\");\n\n  _api_js__WEBPACK_IMPORTED_MODULE_5__.token ? blockAuthorization.classList.add('hidden') : blockWithForms.classList.add('hidden');\n  nameInputElement.value = window.localStorage.getItem(\"userName\");\n  nameInputElement.disabled = true;\n\n  buttonLogin.addEventListener('click', () => (0,_loginPage_js__WEBPACK_IMPORTED_MODULE_4__.renderLogin)({ renderList }));\n  nameInputElement.addEventListener(\"input\", _validation_js__WEBPACK_IMPORTED_MODULE_2__.buttonDisabled);\n  textAreaElement.addEventListener(\"input\", _validation_js__WEBPACK_IMPORTED_MODULE_2__.buttonDisabled);\n  buttonElement.addEventListener(\"click\", _hw9_js__WEBPACK_IMPORTED_MODULE_3__.addComment);\n  blockWithForms.addEventListener(\"keyup\", _hw9_js__WEBPACK_IMPORTED_MODULE_3__.pressEnter);\n\n  const likesBlock = document.querySelector(\".likes\")\n  _api_js__WEBPACK_IMPORTED_MODULE_5__.token ? (0,_likeFunction_js__WEBPACK_IMPORTED_MODULE_0__.initEventlikes)() : likesBlock;\n\n  (0,_replyToComments_js__WEBPACK_IMPORTED_MODULE_1__.reply)();\n  (0,_validation_js__WEBPACK_IMPORTED_MODULE_2__.buttonDisabled)();\n};\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./renderList.js?");

/***/ }),

/***/ "./replyToComments.js":
/*!****************************!*\
  !*** ./replyToComments.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   reply: () => (/* binding */ reply)\n/* harmony export */ });\n/* harmony import */ var _hw9_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hw9.js */ \"./hw9.js\");\n\n\nconst reply = () => {\n    const textAreaElement = document.getElementById(\"textarea-input\");\n    const commentList = document.querySelectorAll('.comment');\n    commentList.forEach((comment, index) => {\n      comment.addEventListener('click', () => {\n        const index = comment.dataset.index;\n        let textName = _hw9_js__WEBPACK_IMPORTED_MODULE_0__.commentsArr[index].name;\n        let textItem = _hw9_js__WEBPACK_IMPORTED_MODULE_0__.commentsArr[index].comment;\n\n        textAreaElement.value = textItem + '\\n' + textName + ' :';\n\n      });\n    })\n  }\n\n\n//# sourceURL=webpack://webdev-dom-homework/./replyToComments.js?");

/***/ }),

/***/ "./validation.js":
/*!***********************!*\
  !*** ./validation.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCommentValidation: () => (/* binding */ addCommentValidation),\n/* harmony export */   buttonDisabled: () => (/* binding */ buttonDisabled)\n/* harmony export */ });\nconst addCommentValidation = () => {\n    const nameInputElement = document.getElementById(\"name-input\");\n    const textAreaElement = document.getElementById(\"textarea-input\");\n\n    nameInputElement.classList.remove(\"error\");\n    textAreaElement.classList.remove(\"error\");\n\n    if (nameInputElement.value === \"\" || nameInputElement.value === \" \") {\n      nameInputElement.classList.add(\"error\");\n    } else if (textAreaElement.value === \"\" || textAreaElement.value === \" \") {\n      textAreaElement.classList.add(\"error\");\n    }\n }\n\nconst buttonDisabled = () => {\n    const nameInputElement = document.getElementById(\"name-input\");\n    const textAreaElement = document.getElementById(\"textarea-input\");\n    const buttonElement = document.getElementById(\"write-button\");\n\n  if (nameInputElement.value === \"\" || textAreaElement.value === \"\") {\n    buttonElement.disabled = true;\n  } else {\n    buttonElement.disabled = false;\n  }\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./validation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./hw9.js");
/******/ 	
/******/ })()
;