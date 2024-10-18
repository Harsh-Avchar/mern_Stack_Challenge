
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');

const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mern_stack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use('/api', transactionRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
