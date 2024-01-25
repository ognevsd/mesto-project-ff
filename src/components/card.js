// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

// @todo: Функция создания карточки
function createNewCard(cardName, cardPicture, pictureDescription, deleteCard, toggleLike, openImage) {
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
function toggleLike(likeBttn) {
  likeBttn.classList.toggle('card__like-button_is-active');
}

export { createNewCard, deleteCard, toggleLike };

