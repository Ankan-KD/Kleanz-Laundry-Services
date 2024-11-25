// Get all nav links
const navLinks = document.querySelectorAll('.nav-links li');

navLinks.forEach(link => {
    const dropdown = link.querySelector('.dropdown');

    // Show dropdown on mouse enter
    link.addEventListener('mouseenter', () => {
        if (dropdown) {
            dropdown.style.display = 'block'; // Show the dropdown
            dropdown.style.opacity = '1'; // Ensure it's visible
        }
    });

    // Hide dropdown on mouse leave after a delay
    link.addEventListener('mouseleave', () => {
        if (dropdown) {
            setTimeout(() => {
                dropdown.style.display = 'none'; // Hide the dropdown
            }, 5000); // Adjust the time (500ms) as needed
        }
    });

    // Prevent dropdown from disappearing when mouse enters dropdown
    if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.style.display = 'block'; // Keep it visible
        });

        dropdown.addEventListener('mouseleave', () => {
            setTimeout(() => {
                dropdown.style.display = 'none'; // Hide after delay
            }, 100); // Same delay as above
        });
    }
});
