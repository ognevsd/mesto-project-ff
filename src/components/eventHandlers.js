import { cardList, formEditProfile, formNewCard, openImage, popupAddNewCard, popupEditProfile, validationSettings } from '../index.js';
import { editProfileInfo } from './api.js';
import { createNewCard, deleteCard, toggleLike } from './card.js';
import { closePopup } from './modal.js';
import { clearValidation } from './validation.js';


const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


function handleFormEditProfile(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  editProfileInfo(nameInputValue, jobInputValue)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupEditProfile);
      clearValidation(formEditProfile, validationSettings);
    })
    .catch(err => console.error(err))

}

// const addNewCardPopup = document.querySelector('.popup_type_new-card');
const placeName = document.querySelector('.popup__input_type_card-name');
const placePicture = document.querySelector('.popup__input_type_url');

function handleAddPlace(evt) {
  evt.preventDefault();

  const newCard = createNewCard(placeName.value, placePicture.value, '', deleteCard, toggleLike, openImage);
  cardList.prepend(newCard);

  closePopup(popupAddNewCard);
  placeName.value = '';
  placePicture.value = '';
  clearValidation(formNewCard, validationSettings);

}

export { handleAddPlace, handleFormEditProfile };
