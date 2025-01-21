const API_URL = 'https://perenual.com/api/species-list?key=sk-K66A6532d6b4851bf2593'; // Sample API

// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error fetching data');
        const result = await response.json(); // Almacena toda la respuesta
        const data = result.data.slice(0, 12); // Accede al campo 'data' y toma los primeros 12 elementos
        renderAlbum(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Render album cards dynamically
function renderAlbum(data) {
    const albumContainer = document.getElementById('album-container');
    albumContainer.innerHTML = ''; // Clear existing content

    const selectedItem = JSON.parse(localStorage.getItem('selectedItem')) || null;

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img class="bd-placeholder-img" width="100%" height="225" src="${item.default_image}">
                <div class="card-body">
                    <p class="card-text">${item.common_name || 'No name available'}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary select-btn" data-id="${item.id}">Select</button>
                        </div>
                        <small class="text-muted">ID: ${item.id}</small>
                    </div>
                </div>
            </div>
        `;
        albumContainer.appendChild(card);

        // Highlight the selected card
        if (selectedItem && selectedItem.id === item.id) {
            card.querySelector('.card').classList.add('selected');
        }
    });

    // Add event listeners to "Select" buttons
    document.querySelectorAll('.select-btn').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            const selected = data.find(item => item.id === itemId);
            saveToLocalStorage(selected);
            highlightSelectedItem(itemId);
        });
    });
}

// Save selected item to localStorage
function saveToLocalStorage(item) {
    localStorage.setItem('selectedItem', JSON.stringify(item));
}

// Highlight the selected card
function highlightSelectedItem(selectedId) {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected');
    });
    const selectedCard = document.querySelector(`.select-btn[data-id="${selectedId}"]`).closest('.card');
    selectedCard.classList.add('selected');
}

// Fetch and render data on page load
document.addEventListener('DOMContentLoaded', fetchData);
