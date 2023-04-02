import calc from './modules/calc.js';
import modalController from './modules/controls.js';
import slider from './modules/slider.js';

const init = () => {
  slider();
  calc();
  modalController({
    modal: '.modal',
    btnOpen: '.js-order',
    btnClose: '.modal__close',
  });
};

init();
