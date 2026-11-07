const themeButton = document.querySelector("#theme-button");
const storedTheme = localStorage.getItem("chamber-theme");

if (storedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("chamber-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("chamber-theme", "dark");
    }
  });
}
