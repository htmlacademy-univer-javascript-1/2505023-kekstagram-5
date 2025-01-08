const URLS = {
  'GET': 'https://29.javascript.htmlacademy.pro/kekstagram/data', // URL для получения данных
  'POST': 'https://29.javascript.htmlacademy.pro/kekstagram' // URL для отправки данных
};

// Функция для отправки HTTP-запроса
const sendRequest = (onSuccess, onError, method, body) => {
  // Используем fetch для отправки запроса
  fetch(
    URLS[method],
    {
      method: method, // Метод запроса (GET или POST)
      body: body, // Тело запроса (для POST)
    },
  )
    // Обрабатываем успешный ответ
    .then((responce) => responce.json())
    .then((data) => {
      onSuccess(data);
    })
    // Обрабатываем ошибку
    .catch((err) => {
      onError(err);
    });
};

// Функция для загрузки данных с сервера
const loadData = (onSuccess, onError, method = 'GET') =>
  sendRequest(onSuccess, onError, method);

// Функция для отправки данных на сервер
const uploadData = (onSuccess, onError, method = 'POST', body) =>
  sendRequest(onSuccess, onError, method, body);

export {loadData, uploadData};
