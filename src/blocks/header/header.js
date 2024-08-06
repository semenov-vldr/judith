const header = document.querySelector(".header");

if (header) {

  const burger = header.querySelector(".header__burger");
  const navScroll = header.querySelector(".nav-scroll");
  const closeNavScrollBtn = navScroll.querySelector(".nav-scroll__close");
  const bgOverlay = header.querySelector(".bg-overlay");
  const navScrollLinks = navScroll.querySelectorAll("a");


  burger.addEventListener("click", () => {
    navScroll.classList.add("js-menu-active");
    blockScrollBody();
  });


  function closeNavScroll() {
    navScroll.classList.remove("js-menu-active");
    unblockScrollBody();
  }

  closeNavScrollBtn.addEventListener("click", closeNavScroll);
  bgOverlay.addEventListener("click", closeNavScroll);

  navScrollLinks.forEach(link => {
    link.addEventListener("click", closeNavScroll);
  });


  window.addEventListener('scroll', trackScroll);

  function trackScroll() {
    const offset = window.scrollY;
    const coords = document.documentElement.clientHeight;
    burger.classList.toggle('js-visible', offset > coords / 2);
  }


}

