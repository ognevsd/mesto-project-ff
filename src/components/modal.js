// Adding animations to all popups when page is loaded
const allPopups = document.querySelectorAll('.popup')
allPopups.forEach(popup => {
  popup.classList.add('popup_is-animated');
})

function openPopup(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeWithEscBttn);
  const closeBttn = element.querySelector('.popup__close');
  closeBttn.addEventListener('click', () => {
    closePopup(element);
  })
  element.addEventListener('click', closeWithOverlay);
}

function closePopup(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closeWithEscBttn);
  element.removeEventListener('click', closeWithOverlay);
  const closeBttn = element.querySelector('.popup__close');
  closeBttn.removeEventListener('click', () => {
    closePopup(element);
  })
}

function closeWithEscBttn(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function closeWithOverlay(evt) {
  if (evt.target.matches('.popup_is-opened')) {
    closePopup(document.querySelector('.popup_is-opened'));
  }

}

export { closePopup, openPopup };

