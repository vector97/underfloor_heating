

const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
    document.documentElement.style.scrollBehavior = 'unset';
  },
  enabledScroll() {
    document.body.style.cssText = '';
    window.scroll({ top: scrollController.scrollPosition });
    document.documentElement.style.scrollBehavior = '';
  },
};

const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
    ) {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
        scrollController.enabledScroll();
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  };

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal);
    scrollController.disabledScroll();
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);

  // маска
  const phone = document.getElementById('phone');
  const imPhone = new Inputmask('+7 (999) 999-99-99');
  imPhone.mask(phone);

  // валидация
  const validator = new JustValidate('.modal__form', {
    errorLabelCssClass: 'modal__input-error',
    errorLabelStyle: {
      color: '#ffc700',
    },
  });

  validator.addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите имя',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Не короче 3 символов',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Не более 30 символов',
    },
  ]);

  validator.addField('#phone', [
    {
      rule: 'required',
      errorMessage: 'Введите номер телефона',
    },
    {
      validator: value => {
        const number = phone.inputmask.unmaskedvalue();
        return number.length === 10;
      },
      errorMessage: 'Введите корректный номер',
    },
  ]);

  validator.onSuccess(e => {
    const form = e.currentTarget;

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        name: form.name.value,
        phone: form.phone.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        form.reset();
        alert(`Спасибо, мы с вами свяжемся! Ваша заявка под номером ${data.id}`);
      });
  });
};

export default modalController;
