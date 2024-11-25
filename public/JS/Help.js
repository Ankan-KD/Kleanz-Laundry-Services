function handleSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  if (email && name && message) {
      // Show the top notification modal
      document.getElementById('modal').style.display = "block";
      // Clear the form fields
      document.getElementById('contactForm').reset();
      // Auto-hide the modal after a few seconds (optional)
      setTimeout(closeModal, 2000); // Adjust time as needed
  } else {
      alert("Please fill out all fields.");
  }
}

function closeModal() {
  document.getElementById('modal').style.display = "none";
}
