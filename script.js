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

  /* ======================
     HERO VIDEO SOUND TOGGLE
     ====================== */

  const video = document.getElementById("heroVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");

  if (video && unmuteBtn) {
    unmuteBtn.addEventListener("click", () => {
      video.muted = false;
      video.play();
      unmuteBtn.style.display = "none";
    });

    video.addEventListener("click", () => {
      video.muted = false;
      video.play();
      unmuteBtn.style.display = "none";
    });
  }
});
