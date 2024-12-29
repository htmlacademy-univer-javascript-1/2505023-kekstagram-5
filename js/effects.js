const EFFECTS = {
  'chrome': {'style': 'grayscale', 'min': 0, 'max': 1, 'step': 0.1},
  'sepia': {'style': 'sepia', 'min': 0, 'max': 1, 'step': 0.1},
  'marvin': {'style': 'invert', 'min': 0, 'max': 100, 'step': 1},
  'phobos': {'style': 'blur', 'min': 0, 'max': 3, 'step': 0.1},
  'heat': {'style': 'brightness', 'min': 1, 'max': 3, 'step': 0.1},
  'none': {},
};

const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const previewPicture = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const removeFilter = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }

  previewPicture.style.filter = '';
  previewPicture.className = '';

  document.getElementById('effect-none').checked = true;

  sliderContainer.classList.add('hidden');
  effectLevelValue.value = '';
};


sliderContainer.classList.add('hidden');

function onChangeEffect(evt){
  if (evt.target.matches('.effects__radio')){
    const button = evt.target;
    const effect = button['value'];

    if(slider.noUiSlider){
      slider.noUiSlider.destroy();
    }
    updateEffect(effect);
  }
}

function updateEffect(effect) {
  if (effect !== 'none') {
    sliderContainer.classList.remove('hidden');
    noUiSlider.create(slider, {
      range: {
        min: EFFECTS[effect]['min'],
        max: EFFECTS[effect]['max'],
      },
      start: EFFECTS[effect]['max'],
      step: EFFECTS[effect]['step'],
      connect: 'lower',
    });

    slider.noUiSlider.on('update', () => {
      const value = slider.noUiSlider.get();
      effectLevelValue.value = value;
      switch (effect) {
        case 'marvin':
          previewPicture.style.filter = `${EFFECTS[effect]['style']}(${value}%)`;
          break;
        case 'phobos':
          previewPicture.style.filter = `${EFFECTS[effect]['style']}(${value}px)`;
          break;
        default:
          previewPicture.style.filter = `${EFFECTS[effect]['style']}(${value})`;
          break;
      }
    });
  } else {
    removeFilter();
  }
}

export { onChangeEffect, removeFilter };
