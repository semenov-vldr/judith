"use strict";

var html = document.querySelector('html');
var classBlockScroll = "js-no-scroll";
function blockScrollBody() {
  if (!html.classList.contains(classBlockScroll)) {
    html.classList.add(classBlockScroll);
  }
}
;
function unblockScrollBody() {
  if (html.classList.contains(classBlockScroll)) {
    html.classList.remove(classBlockScroll);
  }
}
;
"use strict";

// Закрытие dialog по клику на backdrop
function closeOnBackDropClick(_ref) {
  var currentTarget = _ref.currentTarget,
    target = _ref.target;
  var dialogElement = currentTarget;
  var isClickedOnBackDrop = target === dialogElement;
  if (isClickedOnBackDrop) dialogElement.close();
}
"use strict";

AOS.init({
  once: true // Срабатывание только один раз в поле зрения
});
"use strict";

// Модальное окно с Формой
var formPopup = document.querySelector(".form-popup");
if (formPopup) {
  formPopup.addEventListener("click", closeOnBackDropClick);
  var meetingsItems = document.querySelectorAll(".meetings .meetings__item");
  meetingsItems.forEach(function (meetingsItem) {
    var meetingCaption = meetingsItem.querySelector(".meeting__caption").textContent;
    var meetingDate = meetingsItem.querySelector(".meeting-mobile .meeting__date").innerText;
    var meetingTotal = meetingsItem.querySelector(".meeting__total span:nth-child(2)").textContent;

    // Заполнение Заголовка, даты/времени и цены мероприятия в форме
    var popupFormOpenBtn = meetingsItem.querySelector(".meeting__pay-btn");
    var formCaption = formPopup.querySelector(".form-popup__caption");
    var formMeetingDate = formPopup.querySelector(".form-popup__date");
    var formMeetingTotal = formPopup.querySelector(".form-popup__price");
    popupFormOpenBtn.addEventListener("click", function () {
      formCaption.textContent = meetingCaption;
      formMeetingDate.textContent = "\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F: ".concat(meetingDate);
      formMeetingTotal.textContent = meetingTotal;
    });
  });

  // Сброс формы при закрытии
  formPopup.addEventListener("click", function () {
    if (!formPopup.open) {
      var form = formPopup.querySelector(".form-popup__form");
      form.reset();
    }
  });
}

// ---------------------------------------------------------
"use strict";

var header = document.querySelector(".header");
if (header) {
  var closeNavScroll = function closeNavScroll() {
    navScroll.classList.remove("js-menu-active");
    unblockScrollBody();
  };
  var trackScroll = function trackScroll() {
    var offset = window.scrollY;
    var coords = document.documentElement.clientHeight;
    burger.classList.toggle('js-visible', offset > coords / 2);
  };
  var burger = header.querySelector(".header__burger");
  var navScroll = header.querySelector(".nav-scroll");
  var closeNavScrollBtn = navScroll.querySelector(".nav-scroll__close");
  var bgOverlay = header.querySelector(".bg-overlay");
  var navScrollLinks = navScroll.querySelectorAll("a");
  burger.addEventListener("click", function () {
    navScroll.classList.add("js-menu-active");
    blockScrollBody();
  });
  closeNavScrollBtn.addEventListener("click", closeNavScroll);
  bgOverlay.addEventListener("click", closeNavScroll);
  navScrollLinks.forEach(function (link) {
    link.addEventListener("click", closeNavScroll);
  });
  window.addEventListener('scroll', trackScroll);
}
"use strict";

var heroSliders = document.querySelector(".hero__sliders");
if (heroSliders) {
  var heroSliderList = document.querySelectorAll(".hero__slider");
  heroSliderList.forEach(function (heroSlider) {
    var swiper = new Swiper(heroSlider, {
      loop: true,
      autoplay: true
    });
  });
}
"use strict";

// --- Ближайшие встречи ---
var meetings = document.querySelector(".meetings");
if (meetings) {
  // Появление/скрытие подробной инфы встречи (моб версия)
  var meetingItems = meetings.querySelectorAll(".meetings__item");
  meetingItems.forEach(function (meeting) {
    var meetingDesktop = meeting.querySelector(".meeting-desktop");
    var meetingMobile = meeting.querySelector(".meeting.meeting-mobile");
    meetingMobile.addEventListener("click", function () {
      meetingDesktop.classList.toggle("js-active");
    });
  });
  var dialogElements = meetings.querySelectorAll("dialog");
  dialogElements.forEach(function (dialogElement) {
    dialogElement.addEventListener("click", closeOnBackDropClick);

    // Swiper
    var meetingSlider = dialogElement.querySelector(".meeting__menu-popup-slider");
    if (meetingSlider) {
      var swiper = new Swiper(meetingSlider, {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        loop: true
      });
    }
  });
}

// ---------------------------------------------------------
"use strict";

// --- Прошедшие события ---
var pastMeetings = document.querySelector(".past-meetings");
if (pastMeetings) {
  var pastMeetingsSlider = document.querySelector(".past-meetings__slider");
  var pastMeetingsSwiperOptions = {
    watchOverflow: true,
    slidesPerView: "auto",
    freeMode: true,
    breakpoints: {
      320: {
        spaceBetween: 8
      },
      768: {
        spaceBetween: 16
      }
    }
  };
  var pastMeetingsSwiper = new Swiper(pastMeetingsSlider, pastMeetingsSwiperOptions);

  // Создание галереи фотоотчета
  Fancybox.bind('[data-fancybox]', {});
  var pastMeetingItems = pastMeetings.querySelectorAll(".past-meeting");
  pastMeetingItems.forEach(function (pastMeetingItem) {
    // Кнопка "Фотоотчет"
    var openGalleryBtn = pastMeetingItem.querySelector(".past-meeting__btn");
    // Фотогалерея карточки
    var galleryList = Array.from(pastMeetingItem.querySelectorAll(".past-meeting__gallery img"));

    // Добавление фотографий из галереи в Fancybox
    var imgSet = new Set(galleryList.map(function (galleryItem) {
      return {
        src: galleryItem.src
      };
    }));
    openGalleryBtn.addEventListener("click", function () {
      return Fancybox.show(imgSet);
    });
  });
}

// ---------------------------------------------------------