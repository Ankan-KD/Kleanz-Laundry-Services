document.addEventListener('DOMContentLoaded', () => {
    const continueButton = document.getElementById('continueButton');
    const laundryForm = document.getElementById('laundryForm');

    // Enable/disable the continue button based on checkbox selection
    const checkboxes = document.querySelectorAll('.select-service');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            continueButton.disabled = !Array.from(checkboxes).some(ch => ch.checked);
        });
    });

    laundryForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Retrieve the userId from sessionStorage (it should be set during the order page)
        const userId = sessionStorage.getItem('userId');
        
        if (!userId) {
            alert('User ID is missing!');
            return;
        }

        const selectedServices = Array.from(checkboxes)
            .filter(ch => ch.checked)
            .map(ch => ch.value);

        try {
            const response = await fetch('/api/select-services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ services: selectedServices, userId }), // Send actual userId
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                // Redirect to the payment page or show success message
                window.location.href = 'cart_page.html'; // Redirect to the cart page or payments page
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                alert('Error saving services: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form: ' + error.message);
        }
    });
});
