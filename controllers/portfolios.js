
const mongoose = require('mongoose');
const portfolio = require('../db/models/portfolio');
const getPortfolio = mongoose.model('Portfolio');

exports.getPortfolios = async (req, res) => {
    const portfolios = await portfolio.find({});
    return res.json(portfolios);
};