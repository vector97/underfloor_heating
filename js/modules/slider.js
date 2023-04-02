const slider = () => {
  new Swiper('.hero__slider', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '.hero__slider-btn_next',
      prevEl: '.hero__slider-btn_prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      560: {
        spaceBetween: 8,
      },
    },
  });
};

export default slider;
