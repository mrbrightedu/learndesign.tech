/* ============================================================
   Design Lab — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Theme toggle (persisted) ---- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var stored = localStorage.getItem("dl-theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (!stored && prefersDark)) root.setAttribute("data-theme", "dark");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) { root.removeAttribute("data-theme"); localStorage.setItem("dl-theme", "light"); }
      else { root.setAttribute("data-theme", "dark"); localStorage.setItem("dl-theme", "dark"); }
    });
  }

  /* ---- Nav shadow on scroll ---- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 8) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Lesson filtering ---- */
  var chips = document.querySelectorAll(".chip");
  var cards = document.querySelectorAll("#lessonGrid .card");
  var emptyMsg = document.getElementById("gridEmpty");

  function applyFilter(filter) {
    var visible = 0;
    cards.forEach(function (card) {
      var match = filter === "all" || card.getAttribute("data-topic") === filter;
      card.classList.toggle("is-hidden", !match);
      if (match) visible++;
    });
    if (emptyMsg) emptyMsg.hidden = visible !== 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      applyFilter(chip.getAttribute("data-filter"));
    });
  });

  /* Topic cards can also drive the filter when they link to #lessons */
  document.querySelectorAll(".topic[data-topic]").forEach(function (topic) {
    topic.addEventListener("click", function () {
      var t = topic.getAttribute("data-topic");
      var chip = document.querySelector('.chip[data-filter="' + t + '"]');
      if (chip) chip.click();
    });
  });

  /* ---- Video lightbox ---- */
  var lightbox = document.getElementById("lightbox");
  var videoWrap = document.getElementById("lightboxVideo");

  function openVideo(id) {
    videoWrap.innerHTML =
      '<iframe src="https://www.youtube.com/embed/' + id +
      '?autoplay=1&rel=0" title="Lesson video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeVideo() {
    lightbox.hidden = true;
    videoWrap.innerHTML = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".card__media[data-yt]").forEach(function (media) {
    media.addEventListener("click", function () {
      openVideo(media.getAttribute("data-yt"));
    });
  });
  lightbox.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeVideo);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeVideo();
  });
})();
