// --- Ближайшие встречи ---
const meetings = document.querySelector(".meetings");

if (meetings) {

  // Появление/скрытие подробной инфы встречи (моб версия)
  const meetingItems = meetings.querySelectorAll(".meetings__item");

  meetingItems.forEach(meeting => {

    const meetingDesktop = meeting.querySelector(".meeting-desktop");
    const meetingMobile = meeting.querySelector(".meeting.meeting-mobile");

    meetingMobile.addEventListener("click", () => {
      meetingDesktop.classList.toggle("js-active");
    });
  });

  const dialogElements = meetings.querySelectorAll("dialog");

  dialogElements.forEach(dialogElement => {
    dialogElement.addEventListener("click", closeOnBackDropClick);

    // Swiper
    const meetingSlider = dialogElement.querySelector(".meeting__menu-popup-slider");
    if (meetingSlider) {

      const swiper = new Swiper(meetingSlider, {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop: true,
      });
    }
  });
}

// ---------------------------------------------------------