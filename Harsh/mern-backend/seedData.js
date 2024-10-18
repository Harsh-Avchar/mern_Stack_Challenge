
const axios = require('axios');
const mongoose = require('mongoose');
const ProductTransaction = require('./models/ProductTransaction');

mongoose.connect('mongodb://localhost:27017/mern_stack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;


    await ProductTransaction.deleteMany({});
    

    await ProductTransaction.insertMany(transactions);

    console.log("Database initialized with seed data.");
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
