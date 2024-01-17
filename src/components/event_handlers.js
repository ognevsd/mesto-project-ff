import { addCards, deleteCard } from './card.js';
import { initialCards } from './cards.js';
import { closePopup } from './modal.js';

function handleFormSubmit(evt) {
  evt.preventDefault();

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const editProfilePopup = document.querySelector('.popup_type_edit');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closePopup(editProfilePopup);
}

function handleAddPlace(evt) {
  evt.preventDefault();

  const addNewCardPopup = document.querySelector('.popup_type_new-card');
  const placeName = document.querySelector('.popup__input_type_card-name');
  const placePicture = document.querySelector('.popup__input_type_url');
  const cards = document.querySelectorAll('.card');

  const newCard = {
    name: placeName.value,
    link: placePicture.value,
    alt: "",
  }
  placeName.value = '';
  placePicture.value = '';

  cards.forEach((card) => {
    deleteCard(card)
  })
  initialCards.unshift(newCard);
  addCards(initialCards);
  closePopup(addNewCardPopup);
}

export { handleAddPlace, handleFormSubmit };
