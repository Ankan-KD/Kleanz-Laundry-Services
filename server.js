const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer'); // Import nodemailer
const session = require('express-session'); // Import express-session
require('dotenv').config(); // To load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Set to 5000 by default or from .env



app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false, // Prevent unnecessary sessions
    cookie: { secure: false } // Use `secure: true` with HTTPS
}));


// Middleware to serve static files (CSS, JS, images) - Exclude details.html
app.use((req, res, next) => {
  if (req.path === '/details.html' && !req.session.otpVerified) {
      console.log('Access denied: OTP not verified');
      return res.redirect('/login.html'); // Redirect to login if OTP not verified
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public')));


// Middleware to parse JSON request bodies
app.use(express.json());


// MongoDB connection (from .env)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Import routes
const orderRoutes = require('./routes/orderRoutes');
const locationRoutes = require('./routes/locationRoutes');
const selectionRoute = require('./routes/SelectionRoute');
const fetchDetailsRoute = require('./routes/fetchDetailsRoute'); // Import fetchDetailsRoute
const OrderStatusRoutes = require('./routes/OrderStatusRoutes'); // Adjust the file path if necessary
const fetchUserOrdersRoute = require('./routes/fetchUserOrdersRoute');
const sendEmailRoute = require('./routes/sendEmailRoute');// Import sendEmailRoute

// Use routes
app.use('/api', orderRoutes); // Prefixing order routes with /api
app.use('/api', locationRoutes); // Use location routes without prefix
app.use('/', selectionRoute); // Use selection route
app.use('/api', fetchDetailsRoute); // Use fetchDetailsRoute
app.use(OrderStatusRoutes); // Use the routes for order status
app.use('/api', fetchUserOrdersRoute);
app.use('/api', sendEmailRoute);// Use the sendEmailRoute with the `/api` prefix

// Serve specific HTML files
app.get('/location_time.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/location_time.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

// Email setup using nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use the email service you want
  auth: {
    user: process.env.EMAIL_USER,  // Admin email
    pass: process.env.EMAIL_PASS   // Admin email password
  }
});

// OTP generation and sending route
app.post('/send-otp', (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);  // Generate a 6 digit OTP
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send OTP to admin email
    subject: 'Your OTP for Login',
    text: `Your OTP for login is: ${otp}`
  };



  // Send OTP to admin email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error in sending OTP');
    } else {
      // Store OTP in session for verification
      req.session.otp = otp;
      res.status(200).send('OTP sent to admin email');
    }
  });
});


// OTP verification route
app.post('/verify-otp', (req, res) => {
    const enteredOtp = req.body.otp;
    if (enteredOtp == req.session.otp) {
        req.session.otpVerified = true; // Store verification status
        return res.status(200).send({ message: 'OTP verified' });
    } else {
        return res.status(400).send({ message: 'Invalid OTP' });
    }
});



// Secure route for details.html
app.get('/details.html', (req, res) => {
    console.log('Session on /details.html access:', req.session); // Log session data
    
    if (!req.session.otpVerified) {
        console.log('Access denied: OTP not verified');
        return res.redirect('/login.html'); // Redirect if OTP not verified
    }

    console.log('Access granted: OTP verified');
    res.sendFile(path.join(__dirname, 'public', 'details.html')); // Serve the page
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
