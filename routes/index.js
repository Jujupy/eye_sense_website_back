let express = require('express')
let router = express.Router();

let api = require('./api/index')

router.use('/api',api)

module.exports = router