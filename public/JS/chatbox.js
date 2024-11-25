
document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', function (e) {
if (e.key === 'Enter') {
sendMessage();
}
});

function sendMessage() {
const inputField = document.getElementById('userInput');
const messageText = inputField.value.trim();

if (messageText) {
displayMessage(messageText, 'user');
inputField.value = '';
getBotResponse(messageText);
}
}

function displayMessage(message, sender) {
const messagesDiv = document.getElementById('messages');
const messageDiv = document.createElement('div');
messageDiv.classList.add('message', sender);
messageDiv.textContent = message;
messagesDiv.appendChild(messageDiv);
messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
}

function getBotResponse(userMessage) {
let botResponse = '';

// Handling common questions
if (userMessage.includes('price')) {
botResponse = "Our laundry service starts at $10 per load.";
} else if (userMessage.includes('hours') || userMessage.includes('open')) {
botResponse = "We are open from 8 AM to 8 PM, Monday to Saturday.";
} else if (userMessage.includes('pickup')) {
botResponse = "Yes, we offer free pickup and delivery within 5 miles.";
} else if (userMessage.includes('services')) {
botResponse = "We offer washing, drying, ironing, and dry cleaning services.";
} else if (userMessage.includes('address')) {
botResponse = "We are located at 123 Laundry St, Clean City.";
} else if (userMessage.includes('delivery time')) {
botResponse = "Delivery takes about 24 to 48 hours.";
} else if (userMessage.includes('contact')) {
botResponse = "You can reach us at (555) 123-4567 or via email at laundry@service.com.";
} else if (userMessage.includes('discount')) {
botResponse = "We offer a 10% discount on your first order!";
} else if (userMessage.includes('feedback')) {
botResponse = "Thank you for your feedback! We aim to improve our services.";
} else if (userMessage.includes('cancel order')) {
botResponse = "To cancel your order, please call us directly at (555) 123-4567.";

// More FAQs

// Laundry services
} else if (userMessage.includes('folding')) {
botResponse = "Yes, we provide folding services as part of our standard package.";
} else if (userMessage.includes('ironing')) {
botResponse = "We offer professional ironing services for $2 per garment.";
} else if (userMessage.includes('detergent')) {
botResponse = "We use eco-friendly detergents, but you can provide your own if preferred.";
} else if (userMessage.includes('stain removal')) {
botResponse = "We offer special stain removal services for an additional fee.";
} else if (userMessage.includes('dry cleaning')) {
botResponse = "Yes, we provide dry cleaning services for delicate garments.";

// Pickup and Delivery
} else if (userMessage.includes('schedule pickup')) {
botResponse = "You can schedule a pickup through our website or call us at (555) 123-4567.";
} else if (userMessage.includes('delivery fee')) {
botResponse = "We offer free delivery for orders over $20. Otherwise, there's a $5 fee.";
} else if (userMessage.includes('delivery outside 5 miles')) {
botResponse = "We charge an additional $3 for deliveries beyond 5 miles.";
} else if (userMessage.includes('same day delivery')) {
botResponse = "Same day delivery is available for an extra $15, depending on availability.";
} else if (userMessage.includes('missed pickup')) {
botResponse = "If you miss your scheduled pickup, please call us to reschedule at no extra charge.";

// Payment
} else if (userMessage.includes('payment methods')) {
botResponse = "We accept cash, credit/debit cards, and online payments.";
} else if (userMessage.includes('payment on delivery')) {
botResponse = "Yes, you can pay on delivery using cash or card.";
} else if (userMessage.includes('refund policy')) {
botResponse = "We offer a refund if the service is not up to your satisfaction. Please contact us for more details.";
} else if (userMessage.includes('invoice')) {
botResponse = "An invoice will be sent via email once your service is completed.";
} else if (userMessage.includes('discount for bulk orders')) {
botResponse = "We offer a 15% discount on bulk orders of over 20 garments.";

// Service Availability
} else if (userMessage.includes('available in my area')) {
botResponse = "You can check availability by entering your ZIP code on our website.";
} else if (userMessage.includes('holiday hours')) {
botResponse = "We are closed on major holidays like Christmas and Thanksgiving.";
} else if (userMessage.includes('service for businesses')) {
botResponse = "Yes, we offer special laundry packages for businesses and organizations.";
} else if (userMessage.includes('special services for hotels')) {
botResponse = "We provide tailored laundry services for hotels and resorts. Contact us for details.";
} else if (userMessage.includes('same day pickup')) {
botResponse = "Same day pickups are available if booked before noon. Call for availability.";

// Garment care
} else if (userMessage.includes('handle delicate fabrics')) {
botResponse = "We take special care of delicate fabrics like silk and wool.";
} else if (userMessage.includes('shrinkage risk')) {
botResponse = "We use low heat settings to prevent shrinkage, but some fabrics are more prone to shrinking.";
} else if (userMessage.includes('dry clothes only')) {
botResponse = "If you only need drying services, we charge $5 per load.";
} else if (userMessage.includes('separate laundry by color')) {
botResponse = "Yes, we always separate laundry by colors to avoid any color transfer.";
} else if (userMessage.includes('wash comforters')) {
botResponse = "We offer comforter washing for ₹20 per item.";

// Turnaround time
} else if (userMessage.includes('turnaround time')) {
botResponse = "Our standard turnaround time is 24 to 48 hours.";
} else if (userMessage.includes('rush service')) {
botResponse = "Rush services are available for an additional $10 fee.";
} else if (userMessage.includes('weekend delivery')) {
botResponse = "Weekend delivery is available for an extra ₹50 fee.";
} else if (userMessage.includes('expected time')) {
botResponse = "You can expect your laundry to be delivered within 24 to 48 hours.";
} else if (userMessage.includes('delayed order')) {
botResponse = "If your order is delayed, please contact us at (555) 123-4567 for an update.";

// Safety and hygiene
} else if (userMessage.includes('COVID')) {
botResponse = "We follow strict COVID-19 safety measures, including contactless pickup and delivery.";
} else if (userMessage.includes('hygiene standards')) {
botResponse = "We ensure high hygiene standards and use disinfectants in our washing process.";
} else if (userMessage.includes('sanitize')) {
botResponse = "We offer a sanitizing wash for an extra $5 per load.";
} else if (userMessage.includes('contactless delivery')) {
botResponse = "Yes, we provide contactless delivery to ensure your safety.";
} else if (userMessage.includes('staff wearing masks')) {
botResponse = "Our staff always wear masks and gloves while handling laundry.";

// Miscellaneous
} else if (userMessage.includes('track my order')) {
botResponse = "You can track your order using the tracking link sent to your email.";
} else if (userMessage.includes('loyalty program')) {
botResponse = "Join our loyalty program to earn points and get discounts on future orders.";
} else if (userMessage.includes('gift cards')) {
botResponse = "Yes, we offer gift cards! Visit our website for more details.";
} else if (userMessage.includes('lost items')) {
botResponse = "If you think an item is missing, please contact us at (555) 123-4567.";
} else if (userMessage.includes('damaged clothes')) {
botResponse = "If any items are damaged, please report it immediately, and we will investigate.";
} else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey') || userMessage.includes('greetings') || userMessage.includes('good morning') || userMessage.includes('good evening')) {
botResponse = "Hello! How can I assist you today? .";
} else if (userMessage.includes('goodbye') || userMessage.includes('bye') || userMessage.includes('see you') || userMessage.includes('later')) {
botResponse = "Goodbye! Feel free to reach out anytime.";
} else if (userMessage.includes('thank you') || userMessage.includes('thanks') || userMessage.includes('appreciate')) {
botResponse = "You're very welcome! ";

// Default fallback
} else {
botResponse = `You said: "${userMessage}". How can I assist you further?`;
}

setTimeout(() => {
// First, display the main bot response
displayMessage(botResponse, 'bot');

// Then, after a slight delay, display the additional info message
setTimeout(() => {
    displayMessage("Please visit our website for more information.", 'bot');
}, 5000); // Adjust the delay as needed
}, 1000); // Simulate a delay for the main bot response
}

