const express = require('express');
const router = express.Router();

// @ get route  Get API
// @desc        Test route
// access       public

router.get('/', (req, res) => res.send('User.route'));

module.exports = router;