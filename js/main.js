// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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

const partnersSwiper = new Swiper(".partners-slider", {
  loop: true,
  slidesPerView: 6,
  spaceBetween: 30,
  freeMode: true,
  freeModeMomentum: false,
  speed: 1200,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  grabCursor: false,
  centeredSlides: false,
});

/* ===== GSAP ===== */
if (document.body.classList.contains("index")) {
  gsap.from(".hero__title h1", {
    duration: 1.2,
    y: -50,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from(".header", {
    duration: 1.2,
    y: -50,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from(".hero__description", {
    duration: 1.2,
    y: -15,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from(".hero__video__title", {
    duration: 1.5,
    y: 80,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from(".hero__video__img", {
    duration: 1.2,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.fromTo(
    ".hero__portfolio__link",
    {
      y: 100,
      opacity: 0,
      transition: "none",
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
      clearProps: "all",
    }
  );

  gsap.fromTo(
    ".swiper-pagination, .hero-slider-prev, .hero-slider-next",
    {
      y: 30,
      opacity: 0,
      transition: "none",
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
      clearProps: "all",
    }
  );

  /* ===== GSAP PARALAX HERO ===== */
  if (document.body.classList.contains("index")) {
    gsap.to(".hero-slider", {
      y: "15vh",
      ease: "none",
      scrollTrigger: {
        trigger: ".main-index",
        start: "top top",
        end: "+=100%",
        scrub: true,
      },
    });
  }

  /* ===== GSAP COMPANY ITEM ===== */
  if (document.body.classList.contains("index")) {
    gsap.set(".company__list", { gap: 0 });

    const companyTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".company__list",
        start: "top bottom-=150",
        once: true,
      },
    });

    companyTl.from(".company__item", {
      duration: 3,
      x: 200,
      opacity: 0,
      ease: "power3.out",
    });

    companyTl.to(".company__list", {
      gap: "20px",
      duration: 0.5,
      ease: "power3.out",
    });
  }
}
