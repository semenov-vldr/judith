const meetings = document.querySelector(".meetings");

if (meetings) {

  const meetingItems = meetings.querySelectorAll(".meetings__item");

  meetingItems.forEach(meeting => {

    const meetingDesktop = meeting.querySelector(".meeting-desktop");
    const meetingMoreBtn = meeting.querySelector(".meeting__btn");

    meetingMoreBtn.addEventListener("click", () => {
      meetingDesktop.classList.toggle("js-active");
    });
  });


  const dialogElements = meetings.querySelectorAll("dialog");

  dialogElements.forEach(dialogElement => {
    dialogElement.addEventListener("click", closeOnBackDropClick);

    function closeOnBackDropClick({ currentTarget, target }) {
      const dialogElement = currentTarget;
      const isClickedOnBackDrop = target === dialogElement;
      if (isClickedOnBackDrop) dialogElement.close();
    }
  })



}