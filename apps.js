const textToType = [
  "professional web developer",
  "professional Data Entry Expert",
  "professional Google Script Expert",
];
const typedTextElement = document.getElementById("typed-text");
let currentChar = 0;
let currentTextIndex = 0;
let typingDirection = "forward"; // Direction of typing, either "forward" or "backward"

function typeText() {
  const text = textToType[currentTextIndex];

  if (typingDirection === "forward") {
    if (currentChar <= text.length) {
      typedTextElement.innerText = text.slice(0, currentChar);
      currentChar++;
    } else {
      typingDirection = "backward";
    }
  } else if (typingDirection === "backward") {
    if (currentChar >= 0) {
      typedTextElement.innerText = text.slice(0, currentChar);
      currentChar--;
    } else {
      typingDirection = "forward";
      currentTextIndex = (currentTextIndex + 1) % textToType.length;
    }
  }
}

setInterval(typeText, 100); // Adjust the typing speed (in milliseconds)

document.addEventListener("DOMContentLoaded", function () {
  const profileImage = document.querySelector(".profile-image");
  const aboutText = document.querySelector(".about-text");
  const aboutMeSection = document.querySelector("#aboutMe");

  const aboutMePosition = aboutMeSection.getBoundingClientRect().top;

  function handleScroll() {
    const windowScroll = window.scrollY;

    if (windowScroll > aboutMePosition - window.innerHeight / 2) {
      profileImage.style.transform = "scale(1)";
      aboutText.style.opacity = 1;
      aboutText.style.transform = "translateY(0)";
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Initial check on page load
});
// Function to animate counting up the statistics
function countUpStatistics() {
  const stats = document.querySelectorAll(".stat-value");
  const duration = 150; // Animation duration in milliseconds

  stats.forEach((stat) => {
    const start = 0;
    const end = parseInt(stat.getAttribute("data-count"), 10);
    const increment = (end - start) / duration;
    let current = start;

    const updateValue = () => {
      current += increment;
      stat.textContent = `${Math.floor(current)}${
        stat.classList.contains("percent") ? "%" : ""
      }`;

      if (current < end) {
        requestAnimationFrame(updateValue);
      } else {
        stat.textContent = `${end}${
          stat.classList.contains("percent") ? "%" : ""
        }`;
      }
    };

    requestAnimationFrame(updateValue);
  });
}

// Trigger the counting animation when the element is in the viewport
function handleVisibility() {
  const stats = document.querySelectorAll(".stat-value");
  stats.forEach((stat) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        countUpStatistics();
        observer.disconnect();
      }
    });

    observer.observe(stat);
  });
}

// Start the animation when the element is in the viewport
handleVisibility();
