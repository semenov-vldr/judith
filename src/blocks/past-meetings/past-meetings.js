// --- Прошедшие события ---
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

  const pastMeetingItems = pastMeetings.querySelectorAll(".past-meeting");

  pastMeetingItems.forEach(pastMeetingItem => {
    // Кнопка "Фотоотчет"
    const openGalleryBtn = pastMeetingItem.querySelector(".past-meeting__btn");
    // Фотогалерея карточки
    const galleryList = Array.from(pastMeetingItem.querySelectorAll(".past-meeting__gallery img"));

    // Добавление фотографий из галереи в Fancybox
    const imgSet = new Set(galleryList.map(galleryItem => ( {src: galleryItem.src} )));

    openGalleryBtn.addEventListener("click", () => Fancybox.show(imgSet));
  });

}

// ---------------------------------------------------------

