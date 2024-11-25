document.addEventListener("DOMContentLoaded", function () {
    // Retrieve customer data from localStorage
    const laundryOrder = JSON.parse(localStorage.getItem("laundryOrder")) || {
        name: "N/A",
        phone: "N/A",
        email: "N/A",
        quantity: 1,
        items: []
    };

    const addressDetails = JSON.parse(localStorage.getItem("addressDetails")) || {};
    const services = JSON.parse(localStorage.getItem("selectedServices")) || [];
    const items = laundryOrder.items || []; // Directly use items from laundryOrder

    // Get elements for displaying the data
    const customerName = document.getElementById("customerName");
    const customerPhone = document.getElementById("customerPhone");
    const customerEmail = document.getElementById("customerEmail");
    const customerQuantity = document.getElementById("customerQuantity");
    const locationDisplay = document.getElementById("location");
    const itemList = document.getElementById("itemList");
    const serviceList = document.getElementById("serviceList");
    const totalPriceElement = document.getElementById("totalPrice");
    const confirmOrderButton = document.getElementById("confirmOrder");
    const proceedButton = document.getElementById("proceedButton");

    // Display customer details
    if (customerName) customerName.textContent = `Name: ${laundryOrder.name}`;
    if (customerPhone) customerPhone.textContent = `Phone: ${laundryOrder.phone}`;
    if (customerEmail) customerEmail.textContent = `Email: ${laundryOrder.email}`;
    if (customerQuantity) customerQuantity.textContent = `Quantity: ${laundryOrder.quantity}`;

    // Display location details
    if (locationDisplay) {
        locationDisplay.innerHTML = `
            <strong>Location:</strong> ${addressDetails.location || "N/A"}<br>
            <strong>Address Type:</strong> ${addressDetails.addressType || "N/A"}<br>
            <strong>House Number:</strong> ${addressDetails.houseNumber || "N/A"}<br>
            <strong>Street:</strong> ${addressDetails.street || "N/A"}<br>
            <strong>Landmark:</strong> ${addressDetails.landmark || "N/A"}<br>
            <strong>Pincode:</strong> ${addressDetails.pincode || "N/A"}
        `;
    }

    // Display items
    if (itemList) {
        itemList.innerHTML = '';
        if (items.length === 0) {
            itemList.innerHTML = '<li>No items added</li>';
        } else {
            items.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.itemName} - Quantity: ${item.itemQuantity}`;
                itemList.appendChild(li);
            });
        }
    }

    // Calculate total price and display services
    let totalPrice = 0;
    if (serviceList) {
        serviceList.innerHTML = '';
        if (services.length === 0) {
            serviceList.innerHTML = '<li>No services selected</li>';
        } else {
            services.forEach(service => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span class="service-name">${service.service}</span>
                    <span class="service-price">₹${service.price} * ${laundryOrder.quantity} = ₹${service.price * laundryOrder.quantity}</span>
                `;
                serviceList.appendChild(li);
                totalPrice += service.price * laundryOrder.quantity;
            });
        }
    }

    // Display total price
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total Price: ₹${totalPrice}`;
    }

    // Confirm Order button action
    if (confirmOrderButton) {
        confirmOrderButton.addEventListener("click", function () {
            alert("Order confirmed! Thank you for using our service.");
        });
    }

    // Proceed button action
    if (proceedButton) {
        proceedButton.addEventListener("click", function () {
            window.location.href = "payments.html";
        });
    }
});
