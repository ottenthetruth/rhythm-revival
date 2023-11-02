const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check if the user has a dark mode preference
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Set the initial mode based on user preference or a saved preference
if (localStorage.getItem("dark-mode") === "enabled" || (prefersDarkMode && !localStorage.getItem("dark-mode"))) {
  body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

// Toggle dark mode when the switch is clicked
darkModeToggle.addEventListener("change", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
  } else {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
  }
});
