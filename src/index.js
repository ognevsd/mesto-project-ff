import '../pages/index.css';
import { addLike, addNewCard, editProfileInfo, removeLike, requestCards, requestUserInfo, updateAvatar } from './components/api.js';
import { createNewCard, deleteCard, toggleLike } from './components/card.js';
import { closePopup, closeWithButton, openPopup } from './components/modal.js';
import { clearValidation, enableValidation } from './components/validation.js';


// Buttons
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupNewCard = document.querySelector('.profile__add-button');
const buttonOpenEditImagePopup = document.querySelector('.profile__image-edit');
const buttonClosePopup = document.querySelectorAll('.popup__close');

// Popups
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar')

// Popup elements
const imageInPopupImage = popupImage.querySelector('.popup__image');
const textInPopupImage = popupImage.querySelector('.popup__caption');

// Forms
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.querySelector('.popup__form[name="new-place"]');
const formEditProfileImage = document.forms['edit-avatar'];

// User data
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
let userId = '';

// Other elements
const cardList = document.querySelector('.places__list');

// Form inputs
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const newAvatarInput = document.querySelector('#edit-avatar-url-input');
const placeName = document.querySelector('#new-place-name-input');
const placePicture = document.querySelector('#new-place-url-input');

// Event handlers
function handleFormEditProfile(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  editProfileInfo(nameInputValue, jobInputValue)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupEditProfile);
    })
    .catch(err => console.error(err))
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })

}

function handleAddPlace(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  addNewCard(placeName.value, placePicture.value)
    .then((res) => {
      const newCard = createNewCard(res, deleteCard, handleLike, openImage, res.owner._id);
      cardList.prepend(newCard);
      closePopup(popupAddNewCard);
      formNewCard.reset();
    })
    .catch(err => console.error(err))
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })
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

  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  updateAvatar(newAvatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${newAvatarInput.value})`;
      closePopup(popupEditAvatar);
      formEditProfileImage.reset()
    })
    .catch(err => console.error(err))
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })
}

// Rendering initial data
Promise.all([requestUserInfo(), requestCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;
    addCards(cards, userId);
  })
  .catch(err => console.error(err))

// Enabling validation
const validationSettings = {
  inputRegex: /^[a-zA-Zа-яА-Я\s-]+$/,
  inputsToValidate: ['profile-name-input', 'profile-description-input', 'new-place-name-input'],
  customErrorMessage: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

enableValidation(validationSettings);

// General functions
function openImage(imageSrc, imageAlt, cardName) {
  imageInPopupImage.src = imageSrc;
  imageInPopupImage.alt = imageAlt;
  textInPopupImage.textContent = cardName;
  openPopup(popupImage);
}

// @todo: Вывести карточки на страницу
function addCards(cards, userId) {
  cards.forEach(card => {
    const newCard = createNewCard(card, deleteCard, handleLike, openImage, userId);
    cardList.append(newCard);
  })
}

buttonClosePopup.forEach(bttn => {
  bttn.addEventListener('click', closeWithButton)
})

// Event listeners
buttonOpenPopupProfile.addEventListener('click', () => {
  clearValidation(formEditProfile, validationSettings);
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonOpenPopupNewCard.addEventListener('click', () => {
  clearValidation(formNewCard, validationSettings);
  openPopup(popupAddNewCard);
})

buttonOpenEditImagePopup.addEventListener('click', () => {
  clearValidation(formEditProfileImage, validationSettings);
  openPopup(popupEditAvatar);
})

// Working with forms
formEditProfile.addEventListener('submit', handleFormEditProfile);
formNewCard.addEventListener('submit', handleAddPlace);
formEditProfileImage.addEventListener('submit', handleAvatarUpdate);