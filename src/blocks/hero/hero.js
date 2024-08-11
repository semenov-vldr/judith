const heroSliders = document.querySelector(".hero__sliders");

if (heroSliders) {

  const heroSliderList = document.querySelectorAll(".hero__slider");

  heroSliderList.forEach(heroSlider => {

    const swiper = new Swiper(heroSlider, {
      loop: true,
      autoplay: true,
    });

  });

}