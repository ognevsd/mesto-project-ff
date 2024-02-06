const apiConfig = {
  url: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'd7bf71af-b95d-4f26-9aa3-482141173b3c'
  }
}

function requestData(endpoint, config) {
  return fetch(`${apiConfig.url}${endpoint}`, config)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}

function requestUserInfo() {
  const config = {
    headers: apiConfig.headers
  }
  return requestData('/users/me', config)
}

function requestCards() {
  const config = {
    headers: apiConfig.headers
  }
  return requestData('/cards', config)
}

function editProfileInfo(newName, newDescription) {
  const config = {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  }
  return requestData('/users/me', config)
}

function addNewCard(cardName, cardLink) {
  const config = {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  }
  return requestData('/cards', config)
}

function deleteCardFromServer(cardId) {
  const config = {
    method: 'DELETE',
    headers: apiConfig.headers
  }
  return requestData(`/cards/${cardId}`, config)
}

export { addNewCard, deleteCardFromServer, editProfileInfo, requestCards, requestUserInfo };

