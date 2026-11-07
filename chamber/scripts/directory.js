const membersSection = document.querySelector("#members");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");
const membersUrl = "data/members.json";

async function getMembers() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) {
      throw new Error(`Unable to load members (${response.status})`);
    }
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    membersSection.innerHTML = `<p>Member directory could not be loaded. ${error.message}</p>`;
  }
}

function displayMembers(members) {
  membersSection.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const websiteLabel = member.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

    card.innerHTML = `
      <h2>${member.name}</h2>
      <p class="tagline">${member.tagline}</p>
      <div class="member-body">
        <img src="${member.image}" alt="${member.name} logo" width="88" height="88" loading="lazy">
        <div class="member-meta">
          <p><strong>EMAIL:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
          <p><strong>PHONE:</strong> <a href="tel:${member.phone.replace(/[^\d+]/g, "")}">${member.phone}</a></p>
          <p><strong>URL:</strong> <a href="${member.url}" target="_blank" rel="noopener noreferrer">${websiteLabel}</a></p>
        </div>
      </div>
    `;

    membersSection.appendChild(card);
  });
}

function setView(view) {
  membersSection.classList.remove("grid", "list");
  membersSection.classList.add(view);

  const gridSelected = view === "grid";
  gridButton.classList.toggle("active", gridSelected);
  listButton.classList.toggle("active", !gridSelected);
  gridButton.setAttribute("aria-pressed", gridSelected);
  listButton.setAttribute("aria-pressed", !gridSelected);
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

getMembers();
