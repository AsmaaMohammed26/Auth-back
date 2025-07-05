const express = require ('express');
const helmet = require ('helmet');
const cors = require ('cors');
const dotenv = require ('dotenv');
const hpp = require ('hpp');
const dbConnect = require ('./Config/dataBase');

const errorMW = require ('./Middlewares/errorMW');
const userRoute = require ('./Routes/userRoute');

dotenv.config ({path: './config.env'});

const app = express ();
const PORT = process.env.PORT || 5025;

// Connect to database
dbConnect ();

// Middlewares
app.use (hpp ());
app.use (helmet ());
app.use (cors ());
app.use (express.json ());
app.use (express.urlencoded ({extended: true}));

// Routes
app.use ('/api/v1/users', userRoute);
const authRoute = require ('./Routes/authRoute');
app.use ('/api/v1/auth', authRoute);

app.use (errorMW);
// Start server
const server = app.listen (PORT, () => {
  console.log (
    `Server is running on port *********************************${PORT}`
  );
});

// Handle unhandled promise rejections 
process.on ('unhandledRejection', error => {
  console.error (`Unhandled Rejection: ${error.name} - ${error.message}`);
  server.close (() => {
    console.log ('Server closed due to unhandled rejection');
    process.exit (1);
  });
});
