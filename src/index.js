import '../pages/index.css';
import { addCards } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openPopup } from './components/modal.js';

// ElementsdeleteCard
const editProfileBttn = document.querySelector('.profile__edit-button');
const addNewCardBttn = document.querySelector('.profile__add-button');
const palcesList = document.querySelector('.places__list');

// Popups
const editProfileForm = document.querySelector('.popup_type_edit');
const addNewCardForm = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Adding initial cards
addCards(initialCards);

// Event listeners
editProfileBttn.addEventListener('click', () => {
  openPopup(editProfileForm);
});

addNewCardBttn.addEventListener('click', () => {
  openPopup(addNewCardForm);
})

palcesList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const popupImage = imagePopup.querySelector('.popup__image');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    openPopup(imagePopup);
  }
})


