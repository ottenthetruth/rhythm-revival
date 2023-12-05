const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (localStorage.getItem("dark-mode") === "enabled" || (prefersDarkMode && !localStorage.getItem("dark-mode"))) {
  body.classList.add("dark-mode");
  darkModeToggle.checked = true; }
darkModeToggle.addEventListener("change", () => {
if (body.classList.contains("dark-mode")) {
  body.classList.remove("dark-mode");
  localStorage.setItem("dark-mode", "disabled");
} else {
  body.classList.add("dark-mode");
  localStorage.setItem("dark-mode", "enabled"); }
});
