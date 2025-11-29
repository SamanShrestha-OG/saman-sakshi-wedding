// Replace this with your deployed Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbwRlfJdrrizwTlw9JqTSrPYguUjvh-A1KnFAFWE9CIb3RxHSpX1VfC0fJ-GBUxutTOvyQ/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvpForm");
  const statusEl = document.getElementById("formStatus");

  if (!form) return;

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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json().catch(() => ({}));
      if (result.result === "success" || !result.result) {
        statusEl.textContent = "Thank you! Your RSVP has been received.";
        statusEl.style.color = "green";
        form.reset();
      } else {
        throw new Error("Error from server");
      }
    } catch (error) {
      console.error(error);
      statusEl.textContent =
        "Sorry, something went wrong. Please try again or contact us directly.";
      statusEl.style.color = "red";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("heroVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");

  // When user clicks the button → enable sound
  unmuteBtn.addEventListener("click", () => {
    video.muted = false;
    video.play(); // ensure video restarts with sound
    unmuteBtn.style.display = "none"; // hide button
  });

  // Optional: clicking the video also unmutes
  video.addEventListener("click", () => {
    video.muted = false;
    video.play();
    unmuteBtn.style.display = "none";
  });
});
