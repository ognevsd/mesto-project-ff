// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addNewCard(cardName, cardPicture, deleteCard) {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  newCard.querySelector('.card__title').textContent = cardName;
  newCard.querySelector('.card__image').src = cardPicture;

  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(newCard));

  return newCard;
}
// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу
function addCards(cards) {
  cards.forEach(card => {
    const newCard = addNewCard(card.name, card.link, deleteCard);
    cardList.append(newCard);
  })
}

addCards(initialCards);