// seedData.js
const axios = require('axios');
const mongoose = require('mongoose');
const ProductTransaction = require('./models/ProductTransaction');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern_stack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Clear the existing database
    await ProductTransaction.deleteMany({});
    
    // Insert new transactions
    await ProductTransaction.insertMany(transactions);

    console.log("Database initialized with seed data.");
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
