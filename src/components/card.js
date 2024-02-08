import { deleteCardFromServer } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

function getCardTemplate() {
  return cardTemplate.querySelector('.places__item').cloneNode(true);
}

// @todo: Функция создания карточки
function createNewCard(card, deleteCard, handleLike, openImage, currentUser) {
  const newCard = getCardTemplate();
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeElement = newCard.querySelector('.card__like-wrapper');
  const likeBttn = newCard.querySelector('.card__like-button');
  const cardImage = newCard.querySelector('.card__image');
  const cardLikeCounter = newCard.querySelector('.card__like-counter');

  card.likes.forEach((like) => {
    if (like._id === currentUser) {
      likeBttn.classList.add('card__like-button_is-active');
    }
  })

  newCard.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardLikeCounter.textContent = card.likes.length;

  if (card.owner._id === currentUser) {
    deleteButton.addEventListener('click', () => deleteCard(newCard, card._id));
  } else {
    deleteButton.classList.add('card__delete-button-hide');
  }

  likeBttn.addEventListener('click', () => handleLike(likeElement, card._id));
  cardImage.addEventListener('click', () => openImage(card.link, card.alt, card.name));

  return newCard;
}
// @todo: Функция удаления карточки
function deleteCard(card, cardId) {
  deleteCardFromServer(cardId)
    .then(() => card.remove())
    .catch(err => console.error(err));
}

function toggleLike(likeElement, likes) {
  const likeBttn = likeElement.querySelector('.card__like-button');
  const likeCounter = likeElement.querySelector('.card__like-counter');
  likeBttn.classList.toggle('card__like-button_is-active');
  likeCounter.textContent = likes;
}

export { createNewCard, deleteCard, toggleLike };
