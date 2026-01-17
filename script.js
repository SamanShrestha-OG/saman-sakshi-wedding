// Google Apps Script Web App URL
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwRlfJdrrizwTlw9JqTSrPYguUjvh-A1KnFAFWE9CIb3RxHSpX1VfC0fJ-GBUxutTOvyQ/exec";

document.addEventListener("DOMContentLoaded", () => {
  /* ======================
     RSVP FORM HANDLER
     ====================== */

  const form = document.getElementById("rsvpForm");
  const statusEl = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      statusEl.textContent = "Sending your RSVP...";
      statusEl.style.color = "#555";

      const formData = new FormData(form);

      try {
        const response = await fetch(scriptURL, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Network error");

        const result = await response.json().catch(() => ({}));

        statusEl.textContent =
          "Thank you! Your RSVP has been received.";
        statusEl.style.color = "green";
        form.reset();

      } catch (error) {
        console.error(error);
        statusEl.textContent =
          "Something went wrong. Please try again.";
        statusEl.style.color = "red";
      }
    });
  }

const video = document.getElementById("heroVideo");
const unmuteBtn = document.getElementById("unmuteBtn");
const soundOff = document.getElementById("sound-off");
const soundOn = document.getElementById("sound-on");

if (video && unmuteBtn && soundOff && soundOn) {
  // Initial UI state (matches <video muted>)
  soundOff.style.display = "inline";
  soundOn.style.display = "none";

  // Make sure we start muted for autoplay policies
  video.muted = true;
  video.volume = 0;

  unmuteBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const turningOn = video.muted || video.volume === 0;

    if (turningOn) {
      // 🔊 TURN SOUND ON (iPhone-safe)
      video.muted = false;
      video.volume = 1;

      // iOS often needs a restart for audio to attach
      try {
        video.pause();
      } catch (_) {}

      try {
        await video.play();
      } catch (_) {
        // If play fails, try one more time without pause
        try { await video.play(); } catch (_) {}
      }

      soundOff.style.display = "none";
      soundOn.style.display = "inline";
    } else {
      // 🔇 TURN SOUND OFF (reliable everywhere)
      video.volume = 0;
      video.muted = true;

      soundOff.style.display = "inline";
      soundOn.style.display = "none";
    }
  });
}






  /* ======================
     COUNTDOWN TIMER
     ====================== */

  // March 11, 2026 — 6:00 PM CST (Dallas)
  const targetDate = new Date("March 11, 2026 17:30:00 GMT-0600");

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const countdownEl = document.getElementById("countdown");

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.innerHTML =
        "<span style='font-size:1rem; letter-spacing:0.2em;'>It’s today ✨</span>";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000); // update every second

/* ======================
   SMOOTH SCROLL FOR NAV
   ====================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
});