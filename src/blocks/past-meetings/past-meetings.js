const pastMeetings = document.querySelector(".past-meetings");

if (pastMeetings) {

  const pastMeetingsSlider = document.querySelector(".past-meetings__slider");

    const swiper = new Swiper(pastMeetingsSlider, {

      watchOverflow: true,
      slidesPerView: "auto",
      freeMode: true,

      breakpoints: {
        320: {
          spaceBetween: 8,
        },
        768: {
          spaceBetween: 16,
        },

      }

    });




}