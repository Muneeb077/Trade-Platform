const express = require("express");
const {protect} = require('../middleware/authMiddleware');
const {buyStock, sellStock, getStockInfo} = require("../controllers/investmentController");

const router = express.Router();

router.post('/buyStock', protect, buyStock);
router.post('/sellStock', protect, sellStock);
router.get('/getStockInfo', protect, getStockInfo);

module.exports = router;
