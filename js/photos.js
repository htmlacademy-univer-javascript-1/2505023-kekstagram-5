const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png']; // Определяем допустимые типы файлов для загрузки

const uploadFile = document.querySelector('#upload-file'); // Элемент input для загрузки файла
const preview = document.querySelector('.img-upload__preview img'); // Элемент изображения для предпросмотра
const effectList = document.querySelector('.effects__list'); // Список эффектов
const smallImages = effectList.querySelectorAll('span'); // Получаем все элементы span в списке эффектов

// Функция для обработки изменения загружаемого изображения
const onUploadImageChange = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  // Проверяем, соответствует ли тип файла допустимым типам
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    // Обработчик события, который срабатывает после загрузки файла
    reader.addEventListener('load', () => {
      preview.src = reader.result; // Устанавливаем источник изображения предпросмотра
      smallImages.forEach((evt) => {
        evt.style.backgroundImage = `url(${reader.result})`; // Устанавливаем фоновое изображение для каждого элемента эффекта
      });
    });

    reader.readAsDataURL(file); // Читаем файл как URL-адрес данных
  }
};

// Добавляем обработчик события изменения на элемент input для загрузки файла
uploadFile.addEventListener('change', onUploadImageChange);
