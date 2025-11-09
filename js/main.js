/* Хедер — смена фона при скролле */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 25) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* Бургер — открытие/закрытие меню + закрытие на ESC и клике вне */
const burger = document.getElementById("burgerBtn");
const menu = document.getElementById("menu");
const headerContacts = document.querySelector(".header__contacts");

function toggleMenu(forceClose = false) {
  const isActive = forceClose ? false : !burger.classList.contains("active");

  burger.classList.toggle("active", isActive);
  menu.classList.toggle("active", isActive);
  headerContacts.classList.toggle("active", isActive);
}

burger.addEventListener("click", (e) => {
  e.stopPropagation(); // чтобы клик по бургеру не срабатывал как "вне зоны"
  toggleMenu();
});

/* Закрытие по ESC */
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(true);
});

/* Закрытие при клике вне меню */
document.addEventListener("click", (e) => {
  const clickInsideMenu = menu.contains(e.target) || burger.contains(e.target);
  if (!clickInsideMenu && burger.classList.contains("active")) {
    toggleMenu(true);
  }
});

/* Слайдер в hero */
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".hero-slider", {
    effect: "fade",
    /* fadeEffect: { crossFade: true }, */
    loop: true,
    loopedSlides: 4,
    pagination: {
      el: ".swiper-pagination",
      type: "custom",
      renderCustom: (swiper, current, total) => {
        return `${current.toString().padStart(2, "0")} / ${total
          .toString()
          .padStart(2, "0")}`;
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        updateProgress(this);
      },
      slideChange: function () {
        updateProgress(this);
      },
    },
  });

  // прогресс-полоски
  function updateProgress(swiper) {
    const bars = document.querySelectorAll(".progress-bar");
    bars.forEach((bar, index) => {
      if (index === swiper.realIndex) {
        bar.style.width = "116px";
        bar.style.backgroundColor = "#fff";
      } else {
        bar.style.width = "17px";
        bar.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      }
    });
  }

  updateProgress(swiper);

  // защита от частых кликов на стрелки
  const nextBtn = document.querySelector(".swiper-button-next");
  const prevBtn = document.querySelector(".swiper-button-prev");

  nextBtn.addEventListener("click", () => {
    if (swiper.animating) return;
    swiper.slideNext();
  });

  prevBtn.addEventListener("click", () => {
    if (swiper.animating) return;
    swiper.slidePrev();
  });
});
