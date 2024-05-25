const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// Import routes
const todoRoutes = require('./routes/todos');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
