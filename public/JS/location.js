// Initialize the map
var map = L.map('map').setView([22.5726, 88.3639], 13); // Coordinates for Kolkata

// Set up the OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a marker to the map
L.marker([22.5726, 88.3639]).addTo(map)
    .bindPopup('Kolkata, West Bengal')
    .openPopup();

// Handle form submission
const form = document.querySelector('.form');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Retrieve userId from sessionStorage (set during order page)
    const userId = sessionStorage.getItem('userId');
    
    if (!userId) {
        alert('User ID is missing!');
        return;
    }

    // Get form data and convert it to an object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convert form data to a JSON object

    // Add the userId to the form data
    data.userId = userId;

    try {
        const response = await fetch('/api/add-address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Send the data as JSON
        });

        if (response.ok) {
            // Redirect or show success message upon successful address addition
            window.location.href = '/select_service.html'; // Change this to the correct path
        } else {
            const error = await response.text();
            alert('Error adding address: ' + error);
        }
    } catch (err) {
        alert('Error: ' + err);
    }
});
