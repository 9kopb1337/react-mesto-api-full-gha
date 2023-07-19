class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}.`);
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentials,
    }).then((res) => this._checkRes(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentials
    }).then((res) => this._checkRes(res));
  }

  patchProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentials,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkRes(res));
  }

  patchAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentials,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkRes(res));
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentials,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkRes(res));
  }

  deleteCardApi(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentials
    }).then((res) => this._checkRes(res));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentials
    }).then((res) => this._checkRes(res));
  }

  removeLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentials
    }).then((res) => this._checkRes(res));
  }

  toggleLike(cardId, isLiked){
    if (isLiked){
      return this.removeLikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }
}

// export const api = new Api(apiRes);

export const api = new Api({baseUrl: 'https://api.novch.nomoredomains.xyz'});