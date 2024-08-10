// Модальное окно с Формой
const formPopup = document.querySelector(".form-popup");

if (formPopup) {
  formPopup.addEventListener("click", closeOnBackDropClick);


  const meetingsItems = document.querySelectorAll(".meetings .meetings__item");

  meetingsItems.forEach(meetingsItem => {
    const meetingCaption = meetingsItem.querySelector(".meeting__caption").textContent;
    const meetingDate = meetingsItem.querySelector(".meeting-mobile .meeting__date").innerText;
    const meetingTotal = meetingsItem.querySelector(".meeting__total span:nth-child(2)").textContent;


    // Заполнение Заголовка, даты/времени и цены мероприятия в форме
    const popupFormOpenBtn = meetingsItem.querySelector(".meeting__pay-btn");

    const formCaption = formPopup.querySelector(".form-popup__caption");
    const formMeetingDate = formPopup.querySelector(".form-popup__date");
    const formMeetingTotal = formPopup.querySelector(".form-popup__price");

    popupFormOpenBtn.addEventListener("click", () => {
      formCaption.textContent = meetingCaption;
      formMeetingDate.textContent = `Дата и время: ${meetingDate}`;
      formMeetingTotal.textContent = meetingTotal;
    });
  });


  // Сброс формы при закрытии
  formPopup.addEventListener("click", () => {
    if (!formPopup.open) {
      const form = formPopup.querySelector(".form-popup__form");
      form.reset();
    }
  });
}

// ---------------------------------------------------------

