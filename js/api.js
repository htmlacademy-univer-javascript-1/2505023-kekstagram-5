const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const PATHS = {
  GET_DATA:'/data',
  SEND_DATA:'/'
};

const HTTP_REQUESTS = {
  GET:'GET',
  POST: 'POST'
};

const ErrorMessages = {
  GET_DATA: 'Не удалось загрузить данные с сервера',
  SEND_DATA: 'Не удалось отправить форму'
};

const loadData = (path, errorMessage, method = HTTP_REQUESTS.GET, body = null) =>
  fetch(`${SERVER_URL}${path}`, {method, body})
    .then((response) => {
      if (response.ok){
        return response.json();
      }
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => loadData(PATHS.GET_DATA, ErrorMessages.GET_DATA);

const sendData = (body) => loadData(PATHS.SEND_DATA, ErrorMessages.SEND_DATA, HTTP_REQUESTS.POST, body);

export {getData, sendData};
