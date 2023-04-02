const calc = () => {
  const calcForm = document.querySelector('.js-calc-form');
  const calcSquare = document.querySelector('.js-square');
  const calcTotalPrice = document.querySelector('.js-total-price');
  const calcResultWrapper = document.querySelector('.calc__result-wrapper');
  const calcButton = document.querySelector('.js-submit');
  const calcOrder = document.querySelector('.calc__order');

  const tariff = {
    economy: 550,
    comfort: 1400,
    premium: 2700,
  };

  calcForm.addEventListener('input', () => {
    calcButton.disabled =
      !(calcForm.width.value > 0 && calcForm.length.value > 0);
  });

  calcForm.addEventListener('submit', e => {
    e.preventDefault();

    if (calcForm.width.value > 0 && calcForm.length.value > 0) {
      const square = calcForm.width.value * calcForm.length.value;
      const price = square * tariff[calcForm.tariff.value];

      calcResultWrapper.classList.add('calc__result-wrapper_show');
      calcOrder.classList.add('calc__order_show');

      calcSquare.textContent = `${square} кв м`;
      calcTotalPrice.textContent = `${price} руб`;
    }
  });
};

export default calc;
