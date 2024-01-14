function openPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener('keydown', closeWithEscBttn);
  const closeBttn = element.querySelector('.popup__close');
  closeBttn.addEventListener('click', () => {
    closePopup(element);
  })
}

function closePopup(element) {
  element.classList.remove("popup_is-opened");
}

function closeWithEscBttn(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

export { closePopup, openPopup };

