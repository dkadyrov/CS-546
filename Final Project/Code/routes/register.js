const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {

    res.render('register/register')

})

module.exports = router;