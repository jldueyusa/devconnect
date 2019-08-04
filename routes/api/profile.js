const express = require('express');
const router = express.Router();

// @ get route  Get API
// @desc        Test route
// access       public

router.get('/', (req, res) => res.send('Profile.route'));

module.exports = router;