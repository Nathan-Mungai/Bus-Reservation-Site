// theme.js

// Select the theme toggle button
const themeToggle = document.getElementById("theme-toggle");

// Check localStorage for saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const isLightTheme = document.body.classList.toggle("light");
  const theme = isLightTheme ? "light" : "dark";

  // Save the user's theme choice to localStorage
  localStorage.setItem("theme", theme);
});
