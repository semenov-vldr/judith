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
function toggleBlockScrollBody() {
  if (html.classList.contains(classBlockScroll)) {
    html.classList.remove(classBlockScroll);
  } else {
    html.classList.add(classBlockScroll);
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * @typedef {Object} dNode
 * @property {HTMLElement} parent
 * @property {HTMLElement} element
 * @property {HTMLElement} to
 * @property {string} breakpoint
 * @property {string} order
 * @property {number} index
 */

/**
 * @typedef {Object} dMediaQuery
 * @property {string} query
 * @property {number} breakpoint
 */

/**
 * @param {'min' | 'max'} type
 */

useDynamicAdapt();
function useDynamicAdapt() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'max';
  var className = '_dynamic_adapt_';
  var attrName = 'data-da';

  /** @type {dNode[]} */
  var dNodes = getDNodes();

  /** @type {dMediaQuery[]} */
  var dMediaQueries = getDMediaQueries(dNodes);
  dMediaQueries.forEach(function (dMediaQuery) {
    var matchMedia = window.matchMedia(dMediaQuery.query);
    // массив объектов с подходящим брейкпоинтом
    var filteredDNodes = dNodes.filter(function (_ref) {
      var breakpoint = _ref.breakpoint;
      return breakpoint === dMediaQuery.breakpoint;
    });
    var mediaHandler = getMediaHandler(matchMedia, filteredDNodes);
    matchMedia.addEventListener('change', mediaHandler);
    mediaHandler();
  });
  function getDNodes() {
    var result = [];
    var elements = _toConsumableArray(document.querySelectorAll("[".concat(attrName, "]")));
    elements.forEach(function (element) {
      var attr = element.getAttribute(attrName);
      var _attr$split$map = attr.split(',').map(function (val) {
          return val.trim();
        }),
        _attr$split$map2 = _slicedToArray(_attr$split$map, 3),
        toSelector = _attr$split$map2[0],
        breakpoint = _attr$split$map2[1],
        order = _attr$split$map2[2];
      var to = document.querySelector(toSelector);
      if (to) {
        result.push({
          parent: element.parentElement,
          element: element,
          to: to,
          breakpoint: breakpoint !== null && breakpoint !== void 0 ? breakpoint : '767',
          order: order !== undefined ? isNumber(order) ? Number(order) : order : 'last',
          index: -1
        });
      }
    });
    return sortDNodes(result);
  }

  /**
   * @param {dNode} items
   * @returns {dMediaQuery[]}
   */
  function getDMediaQueries(items) {
    var uniqItems = _toConsumableArray(new Set(items.map(function (_ref2) {
      var breakpoint = _ref2.breakpoint;
      return "(".concat(type, "-width: ").concat(breakpoint, "px),").concat(breakpoint);
    })));
    return uniqItems.map(function (item) {
      var _item$split = item.split(','),
        _item$split2 = _slicedToArray(_item$split, 2),
        query = _item$split2[0],
        breakpoint = _item$split2[1];
      return {
        query: query,
        breakpoint: breakpoint
      };
    });
  }

  /**
   * @param {MediaQueryList} matchMedia
   * @param {dNodes} items
   */
  function getMediaHandler(matchMedia, items) {
    return function mediaHandler() {
      if (matchMedia.matches) {
        items.forEach(function (item) {
          moveTo(item);
        });
        items.reverse();
      } else {
        items.forEach(function (item) {
          if (item.element.classList.contains(className)) {
            moveBack(item);
          }
        });
        items.reverse();
      }
    };
  }

  /**
   * @param {dNode} dNode
   */
  function moveTo(dNode) {
    var to = dNode.to,
      element = dNode.element,
      order = dNode.order;
    dNode.index = getIndexInParent(dNode.element, dNode.element.parentElement);
    element.classList.add(className);
    if (order === 'last' || order >= to.children.length) {
      to.append(element);
      return;
    }
    if (order === 'first') {
      to.prepend(element);
      return;
    }
    to.children[order].before(element);
  }

  /**
   * @param {dNode} dNode
   */
  function moveBack(dNode) {
    var parent = dNode.parent,
      element = dNode.element,
      index = dNode.index;
    element.classList.remove(className);
    if (index >= 0 && parent.children[index]) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }

  /**
   * @param {HTMLElement} element
   * @param {HTMLElement} parent
   */
  function getIndexInParent(element, parent) {
    return _toConsumableArray(parent.children).indexOf(element);
  }

  /**
   * Функция сортировки массива по breakpoint и order
   * по возрастанию для type = min
   * по убыванию для type = max
   *
   * @param {dNode[]} items
   */
  function sortDNodes(items) {
    var isMin = type === 'min' ? 1 : 0;
    return _toConsumableArray(items).sort(function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.order === b.order) {
          return 0;
        }
        if (a.order === 'first' || b.order === 'last') {
          return -1 * isMin;
        }
        if (a.order === 'last' || b.order === 'first') {
          return 1 * isMin;
        }
        return 0;
      }
      return (a.breakpoint - b.breakpoint) * isMin;
    });
  }
  function isNumber(value) {
    return !isNaN(value);
  }
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