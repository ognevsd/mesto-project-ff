import {
  cardList,
  formEditProfile,
  formEditProfileImage,
  formNewCard,
  openImage,
  popupAddNewCard,
  popupEditAvatar,
  popupEditProfile,
  profileAvatar,
  validationSettings
} from '../index.js';
import { addLike, addNewCard, editProfileInfo, removeLike, updateAvatar } from './api.js';
import { createNewCard, deleteCard, toggleLike } from './card.js';
import { closePopup } from './modal.js';
import { clearValidation } from './validation.js';


const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const newAvatarInput = document.querySelector('#edit-avatar-url-input');


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
const placeName = document.querySelector('#new-place-name-input');
const placePicture = document.querySelector('#new-place-url-input');

function handleAddPlace(evt) {
  evt.preventDefault();

  addNewCard(placeName.value, placePicture.value)
    .then((res) => {
      const newCard = createNewCard(res, deleteCard, handleLike, openImage, res.owner._id);
      cardList.prepend(newCard);
      closePopup(popupAddNewCard);
      placeName.value = '';
      placePicture.value = '';
      clearValidation(formNewCard, validationSettings);
    })
    .catch(err => console.error(err))
}

function handleLike(likeElement, cardId) {
  const hasLike = likeElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active');
  if (hasLike) {
    removeLike(cardId)
      .then((res) => {
        toggleLike(likeElement, res.likes.length)
      })
      .catch(err => console.error(err))
  } else {
    addLike(cardId)
      .then((res) => {
        toggleLike(likeElement, res.likes.length)
      })
      .catch(err => console.error(err))
  }
}

function handleAvatarUpdate(evt) {
  evt.preventDefault()

  updateAvatar(newAvatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${newAvatarInput.value})`;
      closePopup(popupEditAvatar);
      newAvatarInput.value = '';
      clearValidation(formEditProfileImage, validationSettings);
    })
    .catch(err => console.error(err))
}

export { handleAddPlace, handleAvatarUpdate, handleFormEditProfile, handleLike };

