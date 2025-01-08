import { imagePreview } from './form.js';

const MAX_BLUR_VALUE = 3; // Максимальное значение размытия
const MAX_BRIGHTNESS_VALUE = 3; // Максимальное значение яркости
const MIN_BRIGHTNESS_VALUE = 1; // Минимальное значение яркости
const MAX_VALUE_EFFECT = 100; // Максимальное значение эффекта (для инвертирования)
const MIN_VALUE_EFFECT = 0; // Минимальное значение эффекта
const MAX_GRAYSCALE_EFFECT = 1; // Максимальное значение серого эффекта
const MAX_SEPIA_EFFECT = 1; // Максимальное значение сепии
const EFFECTS_STEP = 0.1; // Шаг изменения эффекта
const STEP_FOR_NONE = 1; // Шаг для отсутствия эффекта

const Slider = {
  MIN: 0, // Минимальное значение слайдера
  MAX: 100, // Максимальное значение слайдера
  STEP: 0.1, // Шаг слайдера
};

const slider = document.querySelector('.effect-level__slider'); // Слайдер для регулировки эффекта
const sliderWrapper = document.querySelector('.effect-level'); // Обертка для слайдера
const effectValue = document.querySelector('.effect-level__value'); // Поле для отображения значения эффекта
const effectList = document.querySelector('.effects__list'); // Список доступных эффектов

// Определяем эффекты и их параметры
const Effects = {
  none: {
    filter: 'none',
    unit: '',
    options: {
      range: {
        min: MIN_VALUE_EFFECT,
        max: MAX_VALUE_EFFECT,
      },
      start: MAX_VALUE_EFFECT,
      step: STEP_FOR_NONE,
    },
  },

  chrome: {
    filter: 'grayscale',
    units: '',
    options: {
      range: {
        min: MIN_VALUE_EFFECT,
        max: MAX_GRAYSCALE_EFFECT,
      },
      start: MAX_GRAYSCALE_EFFECT,
      step: EFFECTS_STEP,
    },
  },

  sepia: {
    filter: 'sepia',
    units: '',
    options: {
      range: {
        min: MIN_VALUE_EFFECT,
        max: MAX_SEPIA_EFFECT,
      },
      start: MAX_SEPIA_EFFECT,
      step: EFFECTS_STEP,
    },
  },

  marvin: {
    filter: 'invert',
    units: '%',
    options: {
      range: {
        min: MIN_VALUE_EFFECT,
        max: MAX_VALUE_EFFECT,
      },
      start: MAX_VALUE_EFFECT,
      step: EFFECTS_STEP,
    },
  },

  phobos: {
    filter: 'blur',
    units: 'px',
    options: {
      range: {
        min: MIN_VALUE_EFFECT,
        max: MAX_BLUR_VALUE,
      },
      start: MAX_BLUR_VALUE,
      step: EFFECTS_STEP,
    },
  },

  heat: {
    filter: 'brightness',
    units: '',
    options: {
      range: {
        min: MIN_BRIGHTNESS_VALUE,
        max: MAX_BRIGHTNESS_VALUE,
      },
      start: MAX_BRIGHTNESS_VALUE,
      step: EFFECTS_STEP,
    },
  },
};

// Инициализация слайдера эффектов
const initEffects = () => {
  const sliderConfig = {
    start: Slider.MAX,
    step: Slider.STEP,

    range: {
      min: Slider.MIN,
      max: Slider.MAX,
    },

    connect: 'lower',

    format: {
      to: (value) => (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)),
      from: (value) => parseFloat(value),
    },
  };

  noUiSlider.create(slider, sliderConfig); // Создаем слайдер с заданными параметрами
};

// Обработчик изменения выбранного фильтра
const onFilterButtonChange = (evt) => {
  const selectedEffect = evt.target.value;

  if (selectedEffect === 'none') {
    sliderWrapper.classList.add('hidden'); // Скрываем слайдер, если эффект отсутствует
    imagePreview.style.filter = 'none';
    imagePreview.removeAttribute('class');
  } else {
    sliderWrapper.classList.remove('hidden');

    imagePreview.setAttribute('class', `effects__preview--${selectedEffect}`);
    slider.noUiSlider.updateOptions(Effects[selectedEffect].options);

    slider.noUiSlider.on('update', (values, handle) => {
      effectValue.value = values[handle];
      imagePreview.style.filter = `${Effects[selectedEffect].filter}(${effectValue.value}${Effects[selectedEffect].units})`;
    });
  }
};

export { onFilterButtonChange, initEffects, effectList, sliderWrapper };
