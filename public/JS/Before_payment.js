// Updated JS/payment.js
document.addEventListener('DOMContentLoaded', function() {
    const upiRadio = document.getElementById('upi');
    const cardRadio = document.getElementById('card');
    const upiSection = document.getElementById('upi-section');
    const cardSection = document.getElementById('card-section');
    const paymentDateInput = document.getElementById('payment-date');

    // Function to toggle between UPI and Card sections
    function togglePaymentSection() {
        if (upiRadio.checked) {
            upiSection.style.display = 'flex';
            cardSection.style.display = 'none';
        } else if (cardRadio.checked) {
            upiSection.style.display = 'none';
            cardSection.style.display = 'block';
        }
    }

    // Function to set current date and time
    function setCurrentDateTime() {
        const now = new Date();
        const formattedDate = now.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });
        paymentDateInput.value = formattedDate;
    }

    // Event listeners for payment method selection
    upiRadio.addEventListener('change', togglePaymentSection);
    cardRadio.addEventListener('change', togglePaymentSection);

    // Initialize the sections and set current date/time on load
    togglePaymentSection();
    setCurrentDateTime();
});




// Get necessary elements from the HTML
const verifyPayButton = document.getElementById("verifyPayButton");
const payNowButton = document.getElementById("payNowButton");
const paymentDateInput = document.getElementById("payment-date");

// Function to generate a random order number
function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000);
}

// Function to create and download the PDF
function downloadBillPDF(orderDetails) {
    const { name, phone, email, quantity, services, totalPrice } = orderDetails;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set consistent font style and size
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Define margin for better layout
    const margin = 20;

    // Add title with margin
    doc.setFontSize(20);
    doc.text("Laundry Service Bill", margin, margin);

    // Add order number
    doc.setFontSize(12);
    doc.text(`Order Number: ${generateOrderNumber()}`, margin, margin + 10);

    // Add customer details
    doc.text(`Name: ${name}`, margin, margin + 20);
    doc.text(`Phone: ${phone}`, margin, margin + 30);
    doc.text(`Email: ${email}`, margin, margin + 40);
    doc.text(`Quantity: ${quantity}`, margin, margin + 50);
    doc.text(`Payment Date: ${paymentDateInput.value}`, margin, margin + 60);

    // Add services details with controlled spacing
    doc.text("Services:", margin, margin + 70);
    let y = margin + 80;
    services.forEach(service => {
        doc.text(`- ${service.service}: ₹${service.price}`, margin, y);
        y += 10; // Space between each service
    });

    // Add total price
    doc.text(`Total Price: ₹${totalPrice}`, margin, y);

    // Save the PDF
    doc.save(`Laundry_Bill_${generateOrderNumber()}.pdf`);
}

// Common function for handling payment confirmation and PDF download
function handlePayment() {
    // Retrieve customer data from localStorage
    const name = localStorage.getItem("laundryName") || "N/A";
    const phone = localStorage.getItem("laundryPhone") || "N/A";
    const email = localStorage.getItem("laundryEmail") || "N/A";
    const quantity = localStorage.getItem("laundryQuantity") || 1;
    const services = JSON.parse(localStorage.getItem("selectedServices")) || [];
    
    // Calculate total price
    let totalPrice = 0;
    services.forEach(service => {
        totalPrice += service.price * quantity;
    });

    // Fill the payment date
    const paymentDate = new Date().toLocaleDateString();
    paymentDateInput.value = paymentDate;

    // Confirm payment and generate PDF
    if (confirm("Confirm Payment?")) {
        downloadBillPDF({ name, phone, email, quantity, services, totalPrice });
        alert("Payment has been done successfully!");
    }
}

// Event listeners for the buttons
verifyPayButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    handlePayment(); // Call the common payment handling function
});

payNowButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    handlePayment(); // Call the common payment handling function
});
