const FILTERS = {
  chrome: { style: 'grayscale', min: 0, max: 1, step: 0.1 },
  sepia: { style: 'sepia', min: 0, max: 1, step: 0.1 },
  invert: { style: 'invert', min: 0, max: 100, step: 1 },
  blur: { style: 'blur', min: 0, max: 3, step: 0.1 },
  brightness: { style: 'brightness', min: 1, max: 3, step: 0.1 },
  none: {},
};

const effectSlider = document.querySelector('.effect-level__slider');
const effectValueDisplay = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderWrapper = document.querySelector('.img-upload__effect-level');

const resetFilter = () => {
  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy(); // Уничтожаем слайдер, если он существует
  }

  imagePreview.style.filter = ''; // Сбрасываем фильтр изображения
  imagePreview.className = ''; // Удаляем классы фильтров

  document.getElementById('effect-none').checked = true; // Устанавливаем радио-кнопку "нет эффекта"

  sliderWrapper.classList.add('hidden'); // Скрываем контейнер слайдера
  effectValueDisplay.value = ''; // Очищаем значение уровня эффекта
};

sliderWrapper.classList.add('hidden'); // Изначально скрываем контейнер слайдера

function onEffectChange(evt) {
  if (evt.target.matches('.effects__radio')) {
    const selectedButton = evt.target;
    const selectedEffect = selectedButton.value;

    if (effectSlider.noUiSlider) {
      effectSlider.noUiSlider.destroy(); // Уничтожаем предыдущий слайдер при смене эффекта
    }
    applyEffect(selectedEffect); // Применяем новый эффект
  }
}

function applyEffect(effect) {
  if (effect !== 'none') {
    sliderWrapper.classList.remove('hidden'); // Показываем контейнер слайдера
    noUiSlider.create(effectSlider, { // Создаем новый слайдер
      range: {
        min: FILTERS[effect].min,
        max: FILTERS[effect].max,
      },
      start: FILTERS[effect].max,
      step: FILTERS[effect].step,
      connect: 'lower',
    });

    effectSlider.noUiSlider.on('update', () => {
      const value = effectSlider.noUiSlider.get(); // Получаем текущее значение слайдера
      effectValueDisplay.value = value; // Обновляем отображение значения эффекта
      switch (effect) {
        case 'invert':
          imagePreview.style.filter = `${FILTERS[effect].style}(${value}%)`; // Применяем инверсию цвета
          break;
        case 'blur':
          imagePreview.style.filter = `${FILTERS[effect].style}(${value}px)`; // Применяем размытие
          break;
        default:
          imagePreview.style.filter = `${FILTERS[effect].style}(${value})`; // Применяем другие эффекты
          break;
      }
    });
  } else {
    resetFilter(); // Сбрасываем фильтр, если выбран "нет эффекта"
  }
}

export { onEffectChange, resetFilter };
