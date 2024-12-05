const sendData = (onSuccess, onFail, body) => {
  fetch('https://29.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(!response.ok) {
        throw new Error('Не удалось отправить фото');
      }
      onSuccess();
    })
    .catch((error) => {
      onFail(error.message);
    });
};

export { sendData };
