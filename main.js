(()=>{"use strict";var e={url:"https://nomoreparties.co/v1/wff-cohort-6",headers:{"Content-Type":"application/json",authorization:"d7bf71af-b95d-4f26-9aa3-482141173b3c"}};function t(t,r){return fetch("".concat(e.url).concat(t),r).then((function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}))}var r=document.querySelector("#card-template").content;function n(e,t,n,o,c){var a=r.querySelector(".places__item").cloneNode(!0),u=a.querySelector(".card__delete-button"),i=a.querySelector(".card__like-wrapper"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__image"),d=a.querySelector(".card__like-counter");return e.likes.forEach((function(e){e._id===c&&l.classList.add("card__like-button_is-active")})),a.querySelector(".card__title").textContent=e.name,s.src=e.link,s.alt=e.alt,d.textContent=e.likes.length,e.owner._id===c?u.addEventListener("click",(function(){return t(a,e._id)})):u.classList.add("card__delete-button-hide"),l.addEventListener("click",(function(){return n(i,e._id)})),s.addEventListener("click",(function(){return o(e.link,e.alt,e.name)})),a}function o(r,n){(function(r){var n={method:"DELETE",headers:e.headers};return t("/cards/".concat(r),n)})(n).then((function(){return r.remove()})).catch((function(e){return console.error(e)}))}function c(e,t){var r=e.querySelector(".card__like-button"),n=e.querySelector(".card__like-counter");r.classList.toggle("card__like-button_is-active"),n.textContent=t}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l),e.addEventListener("click",s)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l),e.removeEventListener("click",s)}function i(e){u(e.target.closest(".popup_is-opened"))}function l(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function s(e){e.target.matches(".popup_is-opened")&&u(e.target.closest(".popup_is-opened"))}function d(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""}function p(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))}function f(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(r){r.setCustomValidity(""),r.removeAttribute("data-error-message"),d(e,r,t)})),n.classList.add(t.inactiveButtonClass),n.disabled=!0}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")}));var _=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),v=document.querySelector(".profile__image-edit"),h=document.querySelectorAll(".popup__close"),S=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),g=document.querySelector(".popup_type_edit-avatar"),C=q.querySelector(".popup__image"),E=q.querySelector(".popup__caption"),k=document.forms["edit-profile"],L=document.querySelector('.popup__form[name="new-place"]'),x=document.forms["edit-avatar"],A=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),T=document.querySelector(".profile__image"),j=document.querySelector(".places__list"),O=document.querySelector(".popup__input_type_name"),B=document.querySelector(".popup__input_type_description"),P=document.querySelector("#edit-avatar-url-input"),D=document.querySelector("#new-place-name-input"),I=document.querySelector("#new-place-url-input");function M(r,n){r.querySelector(".card__like-button").classList.contains("card__like-button_is-active")?function(r){var n={method:"DELETE",headers:e.headers};return t("/cards/likes/".concat(r),n)}(n).then((function(e){c(r,e.likes.length)})).catch((function(e){return console.error(e)})):function(r){var n={method:"PUT",headers:e.headers};return t("/cards/likes/".concat(r),n)}(n).then((function(e){c(r,e.likes.length)})).catch((function(e){return console.error(e)}))}Promise.all([t("/users/me",{headers:e.headers}),t("/cards",{headers:e.headers})]).then((function(e){var t,r,c=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1];A.textContent=a.name,w.textContent=a.about,T.style.backgroundImage="url(".concat(a.avatar,")"),function(e,t){e.forEach((function(e){var r=n(e,o,M,N,t);j.append(r)}))}(u,a._id)})).catch((function(e){return console.error(e)}));var V={inputRegex:/^[a-zA-Zа-яА-Я\s-]+$/,inputsToValidate:["profile-name-input","profile-description-input","new-place-name-input"],customErrorMessage:"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function N(e,t,r){C.src=e,C.alt=t,E.textContent=r,a(q)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);p(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){r.inputsToValidate.includes(t.id)&&(r.inputRegex.test(t.value)?(t.setCustomValidity(""),t.removeAttribute("data-error-message")):(t.setAttribute("data-error-message",r.customErrorMessage),t.setCustomValidity(t.dataset.errorMessage))),function(e,t,r){t.validity.valid?d(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,t,r)}(e,o,t),p(r,n,t)}))}))}(t,e)}))}(V),h.forEach((function(e){e.addEventListener("click",i)})),_.addEventListener("click",(function(){f(k,V),k.elements.name.value=A.textContent,k.elements.description.value=w.textContent,a(S)})),y.addEventListener("click",(function(){f(L,V),a(b)})),v.addEventListener("click",(function(){f(x,V),a(g)})),k.addEventListener("submit",(function(r){r.preventDefault();var n,o,c=O.value,a=B.value,i=r.submitter;i.textContent="Сохранение...",(n=c,o=a,t("/users/me",{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})})).then((function(e){A.textContent=e.name,w.textContent=e.about,u(S)})).catch((function(e){return console.error(e)})).finally((function(){i.textContent="Сохранить"}))})),L.addEventListener("submit",(function(r){r.preventDefault();var c,a,i=r.submitter;i.textContent="Сохранение...",(c=D.value,a=I.value,t("/cards",{method:"POST",headers:e.headers,body:JSON.stringify({name:c,link:a})})).then((function(e){var t=n(e,o,M,N,e.owner._id);j.prepend(t),u(b),L.reset()})).catch((function(e){return console.error(e)})).finally((function(){i.textContent="Сохранить"}))})),x.addEventListener("submit",(function(r){r.preventDefault();var n,o=r.submitter;o.textContent="Сохранение...",(n=P.value,t("/users/me/avatar",{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})})).then((function(e){T.style.backgroundImage="url(".concat(P.value,")"),u(g),x.reset()})).catch((function(e){return console.error(e)})).finally((function(){o.textContent="Сохранить"}))}))})();