const pastMeetings = document.querySelector(".past-meetings");

if (pastMeetings) {

  const pastMeetingsSlider = document.querySelector(".past-meetings__slider");

  const pastMeetingsSwiperOptions = {
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
  };

  let pastMeetingsSwiper = new Swiper(pastMeetingsSlider, pastMeetingsSwiperOptions);


  // Создание галереи фотоотчета
  Fancybox.bind('[data-fancybox]', {});

  // Автоматическое присваивания дата-атрибутов для отдельных галерей для каждой карточки
  const pastMeetingItems = pastMeetings.querySelectorAll(".past-meeting");

  pastMeetingItems.forEach((pastMeetingItem, pastMeetingIndex) => {
    const dataFancybox = pastMeetingItem.querySelector(".past-meeting__btn");
    dataFancybox.dataset.fancybox = pastMeetingIndex;

    const pastMeetingGalleryItems = pastMeetingItem.querySelectorAll(".past-meeting__gallery a");
    pastMeetingGalleryItems.forEach(pastMeetingGalleryItem => {
      pastMeetingGalleryItem.dataset.fancybox = pastMeetingIndex;
    });
  });


}

