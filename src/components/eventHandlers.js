import { cardList, openImage } from '../index.js';
import { createNewCard, deleteCard, toggleLike } from './card.js';
import { closePopup } from './modal.js';


const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfilePopup = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


function handleFormEditProfile(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closePopup();
}

// const addNewCardPopup = document.querySelector('.popup_type_new-card');
const placeName = document.querySelector('.popup__input_type_card-name');
const placePicture = document.querySelector('.popup__input_type_url');

function handleAddPlace(evt) {
  evt.preventDefault();

  const newCard = createNewCard(placeName.value, placePicture.value, '', deleteCard, toggleLike, openImage);
  cardList.prepend(newCard);

  closePopup();
  placeName.value = '';
  placePicture.value = '';

}

export { handleAddPlace, handleFormEditProfile };
