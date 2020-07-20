

const express = require('express');
const router = express.Router();

const { checkJwt } = require('../controllers/auth');

const {
    getPortfolios, 
    getPortfolioById,
    createPortfolio,
    updatePortfolio
} = require('../controllers/portfolios');

router.get('',getPortfolios);
router.get('/:id', getPortfolioById);

router.post('', checkJwt, createPortfolio);

// todo create middleware tocheck for admin rights
router.patch('/:id', updatePortfolio);

module.exports = router;

