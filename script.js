const closedScreen = document.getElementById("closed-screen");
const invitationScreen = document.getElementById("invitation-screen");
const flash = document.getElementById("flash");
const bgMusic = document.getElementById("bgMusic");

const card = document.querySelector(".card-container");
const shimmer = document.querySelector(".card-shimmer");

// ==========================
// FULLSCREEN
// ==========================

function enterFullscreen() {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}

closedScreen.addEventListener("click", () => {
  // Try entering fullscreen
  enterFullscreen();

  // Flash
  flash.classList.add("active");

  // Music
  bgMusic.volume = 0;

  bgMusic.play().catch(() => {});

  let volume = 0;

  const fadeMusic = setInterval(() => {
    volume += 0.02;

    if (volume >= 0.35) {
      volume = 0.35;

      clearInterval(fadeMusic);
    }

    bgMusic.volume = volume;
  }, 100);

  // Transition to invitation
  setTimeout(() => {
    flash.classList.remove("active");

    closedScreen.style.display = "none";

    invitationScreen.classList.add("show");

    card.classList.add("show");

    // Play shimmer shortly after the card appears
    setTimeout(() => {
      shimmer.classList.add("play");
    }, 350);
  }, 250);
});
