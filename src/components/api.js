const apiConfig = {
  url: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'd7bf71af-b95d-4f26-9aa3-482141173b3c'
  }
}

function testApiCall() {
  fetch(`${apiConfig.url}/users/me`, { headers: apiConfig.headers })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
    })
}
