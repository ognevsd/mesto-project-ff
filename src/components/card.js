import { deleteCardFromServer } from "./api";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

// @todo: Функция создания карточки
function createNewCard(card, deleteCard, toggleLike, openImage, currentUser) {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeBttn = newCard.querySelector('.card__like-button');
  const cardImage = newCard.querySelector('.card__image')
  const cardLikeCounter = newCard.querySelector('.card__like-counter')

  newCard.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardLikeCounter.textContent = card.likes.length;

  if (card.owner._id === currentUser) {
    deleteButton.addEventListener('click', () => deleteCard(newCard, card._id));
  } else {
    deleteButton.classList.add('card__delete-button-hide');
  }


  likeBttn.addEventListener('click', () => toggleLike(likeBttn));
  cardImage.addEventListener('click', () => openImage(card.link, card.alt, card.name));

  return newCard;
}
// @todo: Функция удаления карточки
function deleteCard(card, cardId) {
  deleteCardFromServer(cardId)
  card.remove();
}

function toggleLike(likeBttn) {
  likeBttn.classList.toggle('card__like-button_is-active');
}

export { createNewCard, deleteCard, toggleLike };

