const express = require('express');
const ProductTransaction = require('../models/ProductTransaction');

const router = express.Router();


const getMonthFilter = (month) => {
  return {
    $expr: { $eq: [{ $month: '$dateOfSale' }, month] },
  };
};


router.get('/transactions-with-stats', async (req, res) => {
  const { search, page = 1, perPage = 10, month } = req.query;

  const filter = {};

  
  if (month) {
    Object.assign(filter, getMonthFilter(parseInt(month)));
  }


  if (search) {
    const priceSearch = parseFloat(search);
    filter.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
    ];

    if (!isNaN(priceSearch)) {
      filter.$or.push({ price: priceSearch });
    }
  }

  try {
    const totalCount = await ProductTransaction.countDocuments(filter);
    const transactions = await ProductTransaction.find(filter)
      .skip((page - 1) * parseInt(perPage))
      .limit(parseInt(perPage));

  
    const soldItems = await ProductTransaction.countDocuments({ ...filter, sold: true });
    const notSoldItems = await ProductTransaction.countDocuments({ ...filter, sold: false });
    const totalSales = await ProductTransaction.aggregate([
      { $match: { ...filter, sold: true } },
      { $group: { _id: null, totalSales: { $sum: '$price' } } },
    ]);

    
    const priceRanges = [
      { range: '0-100', min: 0, max: 100 },
      { range: '101-200', min: 101, max: 200 },
      { range: '201-300', min: 201, max: 300 },
    ];

    const barChartData = await Promise.all(
      priceRanges.map(async ({ range, min, max }) => {
        const count = await ProductTransaction.countDocuments({
          ...filter,
          price: { $gte: min, $lte: max },
        });
        return { range, count };
      })
    );

    res.json({
      transactions,
      totalCount,
      statistics: {
        totalSales: totalSales.length ? totalSales[0].totalSales : 0,
        soldItems,
        notSoldItems,
      },
      barChartData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router; 
