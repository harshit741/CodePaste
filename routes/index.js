var express = require('express');
var router = express.Router();
var Snippet = require('../models/snippet');
const { request } = require('express');
var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'main',
  });
}).post('/', (req, res, next) => {
  Snippet.create(req.body).then((dish) => {
    res.statusCode = 200;
}, (err) => next(err)).catch((err) => next(err));
})
module.exports = router;
