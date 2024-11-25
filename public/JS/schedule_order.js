document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("schedule-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Check if uuid library is loaded
        if (typeof uuid === "undefined") {
            console.error("UUID library is not loaded correctly.");
            return;
        }

        // Retrieve or generate a unique userId
        let userId = sessionStorage.getItem("userId");
        if (!userId) {
            userId = uuid.v4().slice(0, 7); // Generate a new userId
            sessionStorage.setItem("userId", userId);
        }

        // Collect main form values
        const name = document.getElementById("Name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const quantity = parseInt(document.getElementById("quantity").value);
        const message = document.getElementById("message").value;

        // Collect item details
        const items = [];
        const itemGroups = document.querySelectorAll(".item-group");
        itemGroups.forEach((group) => {
            const itemName = group.querySelector(".item-type").value;
            const itemQuantity = parseInt(group.querySelector(".item-amount").value);

            if (itemName && itemQuantity) {
                items.push({ itemName, itemQuantity });
            }
        });

        // Validate total quantity
        const totalItemQuantity = items.reduce((sum, item) => sum + item.itemQuantity, 0);
        if (totalItemQuantity !== quantity) {
            alert(`The total items must match the specified quantity of ${quantity}.`);
            return;
        }

        // Prepare the full order data object
        const orderData = {
            name,
            phone,
            email,
            quantity,
            message,
            userId,
            items, // Include items array
        };

        // Store order data in local storage
        localStorage.setItem("laundryOrder", JSON.stringify(orderData));

        // Send data to the backend
        try {
            const response = await fetch("/api/schedule-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData), // Send full order data
            });

            if (response.ok) {
                alert("Your order has been placed successfully and stored locally!");
                // Redirect to the next page
                window.location.href = "location_time.html";
            } else {
                const error = await response.text();
                alert("Error saving order: " + error);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to place order.");
        }
    });

    // Dynamically handle "Distribute Items" section
    const quantityInput = document.getElementById("quantity");
    quantityInput.addEventListener("input", function () {
        const quantity = parseInt(quantityInput.value) || 0;
        const distributeSection = document.querySelector(".distribute-section");

        // Clear and regenerate item inputs
        distributeSection.innerHTML = ""; // Clear existing inputs
        for (let i = 0; i < quantity; i++) {
            const group = document.createElement("div");
            group.classList.add("item-group");

            group.innerHTML = `
                <input type="text" class="item-type" placeholder="Item Type (e.g., Shirt)">
                <input type="number" class="item-amount" placeholder="Quantity" min="1">
            `;
            distributeSection.appendChild(group);
        }
    });
});






document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const dynamicItemsSection = document.getElementById("dynamic-items-section");
    const itemsList = document.getElementById("items-list");
    const addItemButton = document.getElementById("add-item-dropdown");

    // Show dynamic section when quantity is entered
    quantityInput.addEventListener("input", function () {
        const quantity = parseInt(quantityInput.value);
        if (quantity && quantity > 0) {
            dynamicItemsSection.style.display = "block";
        } else {
            dynamicItemsSection.style.display = "none";
        }
    });

    // Add a new item dropdown
    addItemButton.addEventListener("click", function () {
        const itemGroup = document.createElement("div");
        itemGroup.classList.add("item-group");

        const itemType = document.createElement("select");
        itemType.classList.add("item-type");
        itemType.innerHTML = `

            <option value="" disabled selected>Select Item</option>
        <option value="Shirt">Shirt</option>
        <option value="Pants">Pants</option>
        <option value="Socks">Socks</option>
        <option value="T-Shirts">T-Shirts</option>
        <option value="Jackets">Jackets</option>
        <option value="Coats">Coats</option>
        <option value="Towels">Towels</option>
        <option value="Bed Sheets">Bed Sheets</option>
        <option value="Pillow Covers">Pillow Covers</option>
        <option value="Blankets">Blankets</option>
        <option value="Curtains">Curtains</option>
        <option value="Jeans">Jeans</option>
        <option value="Sweaters">Sweaters</option>
        <option value="Hoodies">Hoodies</option>
        <option value="Scarves">Scarves</option>
        <option value="Handkerchiefs">Handkerchiefs</option>
        <option value="Dresses">Dresses</option>
        <option value="Other">Other</option>
        `;

        const itemAmount = document.createElement("input");
        itemAmount.classList.add("item-amount");
        itemAmount.type = "number";
        itemAmount.placeholder = "Amount";
        itemAmount.min = 1;

        const otherInput = document.createElement("input");
        otherInput.type = "text";
        otherInput.placeholder = "Specify item";
        otherInput.classList.add("other-input");
        otherInput.style.display = "none";

        itemType.addEventListener("change", function () {
            otherInput.style.display = itemType.value === "Other" ? "block" : "none";
        });

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            itemsList.removeChild(itemGroup);
        });

        itemGroup.appendChild(itemType);
        itemGroup.appendChild(itemAmount);
        itemGroup.appendChild(removeButton);
        itemGroup.appendChild(otherInput);
        itemsList.appendChild(itemGroup);
    });

    // Final validation before form submission
    document.getElementById("schedule-form").addEventListener("submit", function (event) {
        const quantity = parseInt(quantityInput.value);
        const itemAmounts = itemsList.querySelectorAll(".item-amount");
        let totalAmount = 0;

        itemAmounts.forEach((input) => {
            totalAmount += parseInt(input.value) || 0;
        });

        if (totalAmount !== quantity) {
            event.preventDefault(); // Prevent form submission
            alert(
                `The total items (${totalAmount}) must exactly match the specified quantity of ${quantity}. Please adjust the values.`
            );
        } else {
            console.log("Form submitted successfully!");
        }
    });
});

