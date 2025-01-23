
async function fetchCharacters() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCharacters(characters) {
    const albumContainer = document.getElementById('album-container');

    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');
        
        const isSaved = localStorage.getItem(`character-${character.id}`) !== null;
        
        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${character.image}" class="bd-placeholder-img card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">Status: ${character.status}</p>
                    <p class="card-text">Species: ${character.species}</p>
                    <p class="card-text">Gender: ${character.gender}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary save-btn" data-character='${JSON.stringify(character)}'>Save</button>
                        </div>
                        <small class="text-muted">ID: ${character.id}</small>
                    </div>
                    ${isSaved ? '<p class="alert alert-success mt-2">Character saved!</p>' : ''}
                </div>
            </div>
        `;

        albumContainer.appendChild(card);
    });

    // Add event listeners to all save buttons
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', saveCharacter);
    });
}

function saveCharacter(event) {
    const button = event.target;
    const character = JSON.parse(button.getAttribute('data-character'));

    localStorage.setItem(`character-${character.id}`, JSON.stringify(character));

    const cardBody = button.closest('.card-body');
    if (!cardBody.querySelector('.alert')) {
        const message = document.createElement('p');
        message.classList.add('alert', 'alert-success', 'mt-2');
        message.innerText = 'Character saved!';
        cardBody.appendChild(message);
    }
}

document.addEventListener('DOMContentLoaded', fetchCharacters);