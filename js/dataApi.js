const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const API_ENDPOINTS = {
  FETCH_DATA: '/data', // Эндпоинт для получения данных
  SUBMIT_DATA: '/' // Эндпоинт для отправки данных
};

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorMessages = {
  FETCH_DATA: 'Не удалось загрузить данные с сервера',
  SUBMIT_DATA: 'Не удалось отправить форму'
};

// Функция для выполнения HTTP-запросов к серверу
const fetchData = (endpoint, errorMessage, method = HTTP_METHODS.GET, requestBody = null) =>
  fetch(`${API_URL}${endpoint}`, { method, body: requestBody })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Возвращаем ответ в формате JSON, если запрос успешен
      }
      throw new Error(errorMessage);
    })
    .catch(() => {
      throw new Error(errorMessage); // Обработка ошибок запроса
    });

// Функция для получения данных
const loadData = () => fetchData(API_ENDPOINTS.FETCH_DATA, ErrorMessages.FETCH_DATA);

// Функция для отправки данных на сервер
const submitData = (requestBody) => fetchData(API_ENDPOINTS.SUBMIT_DATA, ErrorMessages.SUBMIT_DATA, HTTP_METHODS.POST, requestBody);

export { loadData, submitData };
