const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetsData() {
    try {
    const response = await fetch(url);
    const data = await response.json();
    
    displayProphets(data.prophets);
} catch (error) {
    console.error('Error fetching prophets data:', error);
}
}

function displayProphets(prophets) {
    console.log(prophets);
    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        card.appendChild(fullName);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}

getProphetsData();