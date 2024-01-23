import '../pages/index.css';
import { addCards } from './components/card.js';
import { initialCards } from './components/cards.js';
import { handleAddPlace, handleFormSubmit } from './components/event_handlers.js';
import { openPopup } from './components/modal.js';

// ElementsdeleteCard
const editProfileBttn = document.querySelector('.profile__edit-button');
const addNewCardBttn = document.querySelector('.profile__add-button');

// Popups
const editProfilePopup = document.querySelector('.popup_type_edit');
const addNewCardPopup = document.querySelector('.popup_type_new-card');


// Adding initial cards
addCards(initialCards);

// User data
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Event listeners
editProfileBttn.addEventListener('click', () => {
  const editProfileForm = document.forms['edit-profile'];
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;

  openPopup(editProfilePopup);
});

addNewCardBttn.addEventListener('click', () => {
  openPopup(addNewCardPopup);
})

// Working with forms
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
formElement.addEventListener('submit', handleFormSubmit);


const newCardForm = document.querySelector('.popup__form[name="new-place"]');
newCardForm.addEventListener('submit', handleAddPlace)