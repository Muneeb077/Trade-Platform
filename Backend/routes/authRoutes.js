const express = require("express");
const {registerUser,loginUser,getuserInfo,googleAuth} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.get('/getUser', protect, getuserInfo);

module.exports = router;