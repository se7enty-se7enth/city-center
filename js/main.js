/* ===== ХЕДЕР — смена фона при скролле ===== */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 25) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* ===== БУРГЕР ===== */
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
  e.stopPropagation();
  toggleMenu();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(true);
});

document.addEventListener("click", (e) => {
  const clickInsideMenu = menu.contains(e.target) || burger.contains(e.target);
  if (!clickInsideMenu && burger.classList.contains("active")) {
    toggleMenu(true);
  }
});

/* ===== HERO SLIDER ===== */
const heroSwiper = new Swiper(".hero-slider", {
  effect: "fade",
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
    nextEl: ".hero-slider-next",
    prevEl: ".hero-slider-prev",
  },
  on: {
    init() {
      updateProgress(this);
    },
    slideChange() {
      updateProgress(this);
    },
  },
});

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

/* ===== TASK SLIDER ===== */
const taskSwiper = new Swiper(".task-slider", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".task-slider-next",
    prevEl: ".task-slider-prev",
  },
});
