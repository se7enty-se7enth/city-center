/* ===== 1. БЕЗОПАСНАЯ РЕГИСТРАЦИЯ GSAP ===== */
const gsapLoaded =
  typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

if (gsapLoaded) {
  gsap.registerPlugin(ScrollTrigger);
}

/* ===== 2. ОБЩИЙ ФУНКЦИОНАЛ (Хедер, Меню) ===== */
const header = document.querySelector(".header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 25) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

const burger = document.getElementById("burgerBtn");
const menu = document.getElementById("menu");
const headerContacts = document.querySelector(".header__contacts");

if (burger) {
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
    const clickInsideMenu =
      menu.contains(e.target) || burger.contains(e.target);
    if (!clickInsideMenu && burger.classList.contains("active")) {
      toggleMenu(true);
    }
  });
}

/* ===== 3. СЛАЙДЕРЫ ===== */

// --- Hero Slider ---
if (document.querySelector(".hero-slider")) {
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
    if (bars.length > 0) {
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
  }
}

// --- Task Slider ---
if (document.querySelector(".task-slider")) {
  const taskSwiper = new Swiper(".task-slider", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".task-slider-next",
      prevEl: ".task-slider-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
    },
  });
}

// --- Partners Slider ---
if (document.querySelector(".partners-slider")) {
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
}

/* ===== 4. GSAP АНИМАЦИИ ===== */
window.addEventListener("load", () => {
  if (gsapLoaded && document.body.classList.contains("index")) {
    // --- HERO ANIMATIONS ---
    const heroTl = gsap.timeline();

    heroTl.from(
      ".hero__title h1",
      {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3,
      },
      0
    );

    heroTl.from(
      ".header",
      {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: "power3.out",
      },
      0.3
    );

    heroTl.from(
      ".hero__description",
      {
        duration: 1.2,
        y: -15,
        opacity: 0,
        ease: "power3.out",
      },
      0.3
    );

    heroTl.from(
      ".hero__video__title",
      {
        duration: 1.5,
        y: 80,
        opacity: 0,
        ease: "power3.out",
      },
      0.3
    );

    heroTl.from(
      ".hero__video__img",
      {
        duration: 1.2,
        y: 30,
        opacity: 0,
        ease: "power3.out",
      },
      0.3
    );

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

    // Анимация появления пагинации
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
      }
    );

    // === ЗДЕСЬ БЫЛ КОД ИСЧЕЗНОВЕНИЯ, Я ЕГО УДАЛИЛ ===

    /* ===== PARALLAX HERO ===== */
    if (document.querySelector(".hero-slider")) {
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

    /* ===== COMPANY SECTION ===== */
    gsap.set(".company__list", { gap: 0, columnGap: 0 });

    const companyTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".company__list",
        start: "top bottom-=150",
        once: true,
      },
    });

    companyTl.from(".company__item", {
      duration: 2.5,
      x: 250,
      opacity: 0,
      ease: "power3.out",
    });

    companyTl.to(
      ".company__list",
      {
        columnGap: "20px",
        duration: 2.5,
        ease: "power3.out",
      },
      "-=2"
    );

    /* ===== PARALLAX (COMPANY -> PROJECTS) ===== */
    gsap.to(".company__services", {
      y: "50vh",
      ease: "none",
      scrollTrigger: {
        trigger: ".company__services",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    /* ===== PROJECTS SECTION ===== */
    const projectItems = gsap.utils.toArray(".project__item");
    if (projectItems.length > 0) {
      projectItems.forEach((item) => {
        gsap.fromTo(
          [
            item.querySelector(".project__item__inner"),
            item.querySelector(".project__item__right__img"),
          ],
          {
            y: 0,
          },
          {
            y: "-40vh",
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }

    /* ===== PERFORMANCES SECTION ===== */
    gsap.from(".perfomances__breadcrumbs", {
      scrollTrigger: { trigger: ".perfomances", start: "top 80%" },
      x: 100,
      opacity: 0,
      duration: 1.4,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".perfomances__title", {
      scrollTrigger: { trigger: ".perfomances", start: "top 80%" },
      x: 60,
      opacity: 0,
      duration: 1.4,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".perfomances__description", {
      scrollTrigger: { trigger: ".perfomances", start: "top 80%" },
      x: 60,
      opacity: 0,
      duration: 1.4,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.fromTo(
      ".perfomances__img img",
      { scale: 1.05 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: ".perfomances__img",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        duration: 1.2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".perfomances__img",
      { "--pseudo-x": "60px" },
      {
        "--pseudo-x": "0px",
        scrollTrigger: {
          trigger: ".perfomances__img",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        duration: 2,
        ease: "power3.out",
      }
    );

    gsap.to(".perfomances", {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: ".perfomances",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    /* ===== ACHIEVEMENTS SECTION ===== */
    gsap.fromTo(
      ".achievements__list",
      { clipPath: "inset(0% 10% 0% 10%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scrollTrigger: {
          trigger: ".achievements",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        duration: 1.5,
        ease: "power3.out",
      }
    );

    /* ===== HEADMASTER SECTION ===== */
    gsap.set(".partners", { position: "relative", zIndex: 1 });
    gsap.set(".headmaster", {
      position: "relative",
      zIndex: 999,
      transform: "translate3d(0,0,0)",
    });

    gsap.to(".partners", {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: ".partners",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(
      ".headmaster",
      { paddingTop: "0px" },
      {
        paddingTop: "180px",
        ease: "none",
        scrollTrigger: {
          trigger: ".headmaster",
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".headmaster__info",
      {
        webkitMaskImage: "linear-gradient(90deg, transparent 60%, black 60%)",
        maskImage: "linear-gradient(90deg, transparent 60%, black 60%)",
      },
      {
        webkitMaskImage: "linear-gradient(90deg, transparent 0%, black 0%)",
        maskImage: "linear-gradient(90deg, transparent 0%, black 0%)",
        scrollTrigger: {
          trigger: ".headmaster__info",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        duration: 1.5,
        ease: "power3.out",
      }
    );

    gsap.from(".headmaster__inner", {
      scrollTrigger: { trigger: ".headmaster__info", start: "top 80%" },
      x: 30,
      opacity: 0,
      duration: 1.4,
      delay: 0.3,
      ease: "power3.out",
    });

    /* ===== APPROACH SECTION ===== */
    gsap.set(".approach__list", { gap: 0 });

    const approachTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".approach__list",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    approachTl.from(".approach__item", {
      x: 200,
      opacity: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power3.out",
    });

    approachTl.to(
      ".approach__list",
      {
        gap: "12px",
        duration: 1.5,
        ease: "power3.out",
      },
      "<"
    );

    approachTl.fromTo(
      ".approach__item img",
      { scale: 1.2 },
      {
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "<"
    );
  }
});
