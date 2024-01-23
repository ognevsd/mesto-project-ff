import { openPopup } from "./modal";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');



// @todo: Функция создания карточки
function addNewCard(cardName, cardPicture, pictureDescription, deleteCard, toggleLike, openImage) {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeBttn = newCard.querySelector('.card__like-button');
  const cardImage = newCard.querySelector('.card__image')

  newCard.querySelector('.card__title').textContent = cardName;
  cardImage.src = cardPicture;
  cardImage.alt = pictureDescription;

  deleteButton.addEventListener('click', () => deleteCard(newCard));
  likeBttn.addEventListener('click', () => toggleLike(likeBttn));
  cardImage.addEventListener('click', () => openImage(cardPicture, pictureDescription, cardName));

  return newCard;
}
// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

function openImage(imageSrc, imageAlt, cardName) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupText = imagePopup.querySelector('.popup__caption')
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupText.textContent = cardName;
  openPopup(imagePopup);
}

function toggleLike(likeBttn) {
  likeBttn.classList.toggle('card__like-button_is-active');
}

// @todo: Вывести карточки на страницу
function addCards(cards) {
  cards.forEach(card => {
    const newCard = addNewCard(card.name, card.link, card.alt, deleteCard, toggleLike, openImage);
    cardList.append(newCard);
  })
}

export { addCards, addNewCard, deleteCard };

