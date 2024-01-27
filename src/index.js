import '../pages/index.css';
import { createNewCard, deleteCard, toggleLike } from './components/card.js';
import { initialCards } from './components/cards.js';
import { handleAddPlace, handleFormEditProfile } from './components/eventHandlers.js';
import { closeWithButton, openPopup } from './components/modal.js';


// Buttons
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupNewCard = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelectorAll('.popup__close');

// Popups
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Popup elements
const imageInPopupImage = popupImage.querySelector('.popup__image');
const textInPopupImage = popupImage.querySelector('.popup__caption')

// Forms
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.querySelector('.popup__form[name="new-place"]');

// User data
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Other elements
const cardList = document.querySelector('.places__list');


// General functions
function openImage(imageSrc, imageAlt, cardName) {
  imageInPopupImage.src = imageSrc;
  imageInPopupImage.alt = imageAlt;
  textInPopupImage.textContent = cardName;
  openPopup(popupImage);
}

// @todo: Вывести карточки на страницу
function addCards(cards) {
  cards.forEach(card => {
    const newCard = createNewCard(card.name, card.link, card.alt, deleteCard, toggleLike, openImage);
    cardList.append(newCard);
  })
}

buttonClosePopup.forEach(bttn => {
  bttn.addEventListener('click', closeWithButton)
})

// Adding initial cards
addCards(initialCards);

// Event listeners
buttonOpenPopupProfile.addEventListener('click', () => {
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonOpenPopupNewCard.addEventListener('click', () => {
  openPopup(popupAddNewCard);
})

// Working with forms
formEditProfile.addEventListener('submit', handleFormEditProfile);
formNewCard.addEventListener('submit', handleAddPlace)

export { cardList, openImage, popupAddNewCard, popupEditProfile };

