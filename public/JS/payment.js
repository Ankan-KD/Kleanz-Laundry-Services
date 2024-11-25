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

 
 

document.addEventListener("DOMContentLoaded", function ()
{
    const verifyPayButton = document.getElementById("verifyPayButton");
    const payNowButton = document.getElementById("payNowButton");

    // Function to get the order number from sessionStorage
    function generateOrderNumber() {
        const orderNumber = sessionStorage.getItem("userId");
        return orderNumber; // Return the order number directly from sessionStorage
    }

    function downloadBillPDF(orderDetails) {
        const { name, phone, email, quantity, services, totalPrice, paymentDate, items } = orderDetails;
    
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
    
        // Define constants for styling
        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
    
        // Add a subtle watermark (Company Logo or Text)
        doc.setFont("helvetica", "italic");
        doc.setFontSize(45);
        doc.setTextColor(240);
        doc.text("Kleanz Laundry Services", pageWidth / 2, pageHeight / 2, {
            align: "center",
            angle: 45,
        });
    
        // Add header section with bold title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text("Laundry Service Bill", pageWidth / 2, margin, { align: "center" });
    
        // Add horizontal line below the title
        doc.setDrawColor(0, 0, 0);
        doc.line(margin, margin + 5, pageWidth - margin, margin + 5);
    
        // Customer details section
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        let y = margin + 15;
        doc.text(`Order Number: ${generateOrderNumber()}`, margin, y);
        y += 8;
        doc.text(`Name: ${name || "N/A"}`, margin, y);
        y += 8;
        doc.text(`Phone: ${phone || "N/A"}`, margin, y);
        y += 8;
        doc.text(`Email: ${email || "N/A"}`, margin, y);
        y += 8;
        doc.text(`Quantity: ${quantity}`, margin, y);
        y += 8;
        doc.text(`Payment Date: ${paymentDate}`, margin, y);
    
        // Add items list
        y += 10;
        doc.setFont("helvetica", "bold");
        doc.text("Items:", margin, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        items.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.itemName} (Quantity: ${item.itemQuantity})`, margin + 5, y);
            y += 8;
        });
    
        // Add another horizontal line
        y += 10;
        doc.line(margin, y, pageWidth - margin, y);
        y += 10;
    
        // Add services table header
        doc.setFont("helvetica", "bold");
        doc.setFillColor(230, 230, 230); // Light gray background for table header
        doc.rect(margin, y - 5, pageWidth - 2 * margin, 10, "F");
        doc.text("S.No.", margin + 5, y);
        doc.text("Service", margin + 25, y);
        doc.text("Price ", margin + 100, y);
        doc.text("Total ", margin + 150, y);
        y += 10;
    
        // Table rows for services
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        let rowBackground = false;
        const parsedQuantity = parseInt(quantity, 10) || 1;
    
        services.forEach((service, index) => {
            if (rowBackground) {
                doc.setFillColor(245, 245, 245); // Alternating light row color
                doc.rect(margin, y - 5, pageWidth - 2 * margin, 10, "F");
            }
            rowBackground = !rowBackground;
    
            doc.text(`${index + 1}`, margin + 5, y);
            doc.text(`${service.service}`, margin + 25, y);
            doc.text(`${service.price.toFixed(2)}`, margin + 100, y);
            doc.text(`${(service.price * parsedQuantity).toFixed(2)}`, margin + 150, y);
            y += 10;
        });
    
        // Summary section with totals
        y += 5;
        doc.setFont("helvetica", "bold");
        doc.setDrawColor(0, 0, 0);
        doc.line(margin, y, pageWidth - margin, y); // Separator line
        y += 10;
        doc.text(`Total Price: Rs.${totalPrice.toFixed(2)}`, margin, y);
    
        // Add footer with contact info
        y = pageHeight - 20;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.text("Thank you for choosing Kleanz Laundry Services!", margin, y);
        y += 5;
        doc.text("For support, contact us at: support@kleanz.com | +91 9038421528", margin, y);

            // Save the PDF file to the user's system
    doc.save(`Laundry_Bill_${generateOrderNumber()}.pdf`);
    
        // Return the PDF as a Blob for sending via email
        return doc.output("blob");
    }
    






    // Function to send the PDF via email
    function sendBillByEmail(orderDetails) {
        const pdfBlob = downloadBillPDF(orderDetails);

        // Create a FormData object to send the PDF
        const formData = new FormData();
        formData.append("email", orderDetails.email);
        formData.append("file", pdfBlob, `Laundry_Bill_${generateOrderNumber()}.pdf`);

        // Send the PDF via fetch API
        fetch("/api/send-email", { // Updated URL
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    showNotification("Bill emailed successfully!");
                } else {
                    showNotification("Failed to send email.");
                }
            })
            .catch((error) => {
                console.error("Error sending email:", error);
            });
    }

    function handlePayment() {
        // Retrieve customer data from localStorage
        const orderData = JSON.parse(localStorage.getItem("laundryOrder"));
        if (!orderData) {
            alert("No order data found. Please place an order first.");
            return;
        }
    
        // Log order data to verify its structure
        console.log("Order Data:", orderData);
    
        // Retrieve services from localStorage (separate from orderData)
        const services = JSON.parse(localStorage.getItem("selectedServices")) || [];
        console.log("Services:", services);
    
        if (!Array.isArray(services) || services.length === 0) {
            alert("No services found for this order.");
            return;
        }
    
        // Extract relevant order details
        const { name, phone, email, quantity, items } = orderData;

    
        // Calculate total price
        let totalPrice = 0;
        services.forEach(service => {
            totalPrice += service.price * quantity;
        });
    
        // Fill the payment date
        const paymentDate = new Date().toLocaleString("en-GB");
    
        // Confirm payment and generate PDF
        if (confirm("Confirm Payment?")) {
            sendBillByEmail({ name, phone, email, quantity, services, totalPrice, paymentDate, items: orderData.items });
            showNotification("Payment has been done successfully!");
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
});





function showNotification(message, type = "success", duration = 3000) {
    // Create a notification container if it doesn't exist
    let container = document.getElementById("notification-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";
        container.style.position = "fixed";
        container.style.top = "20px";
        container.style.right = "20px";
        container.style.zIndex = "10000";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "10px";
        document.body.appendChild(container);
    }

    // Create the notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.padding = "15px 20px";
    notification.style.borderRadius = "8px";
    notification.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    notification.style.backgroundColor = type === "success" ? "#e6f7e6" : "#fbe5e5"; // Green for success, Red for error
    notification.style.border = type === "success" ? "1px solid #27ae60" : "1px solid #e74c3c";
    notification.style.color = type === "success" ? "#27ae60" : "#e74c3c";
    notification.style.animation = "fadeInOut 0.5s, fadeOut 0.5s ease-in-out";

    // Add an icon/logo
    const icon = document.createElement("img");
    icon.src = type === "success" ? "../icons/success-icon.png" : "../icons/error-icon.png";
    icon.alt = type === "success" ? "Success" : "Error";
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.marginRight = "10px";

    // Add the message
    const text = document.createElement("span");
    text.textContent = message;

    // Append icon and message to the notification
    notification.appendChild(icon);
    notification.appendChild(text);

    // Add the notification to the container
    container.appendChild(notification);

    // Remove the notification after the specified duration
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, duration);
}
