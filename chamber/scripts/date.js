const yearSpan = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}
