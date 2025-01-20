const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors()); //frontend requests

// admin password
const ADMIN_PASSWORD_HASH = bcrypt.hashSync("IamAdmin123", 10); // this is my (admin)password

// Endpoint to handle login
app.post('/login', (req, res) => {
  const { password } = req.body;

  if (bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    res.status(200).json({ success: true, message: "Login successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid password!" });
  }
});

// Starting the  server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.post('/submit-opportunity', (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required!"
      });
    }
  
    // Save the opportunity.
    console.log("Opportunity Submitted:", { title, description });
  
    // Respond to the frontend
    res.status(200).json({
      success: true,
      message: "Opportunity submitted successfully!"
    });
  });
  