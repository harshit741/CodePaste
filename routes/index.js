var express = require('express');
var router = express.Router();
var Snippet = require('../models/snippet');
var bodyParser = require('body-parser')
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    layout: 'main',
  });
}).post('/', (req, res) => {
  Snippet.create(req.body).then(result => {
    res.send({
      StatusCode: 200,
      StatusMessage: 'Save Success.'
    })
  }).catch(err => {
    let msg = ''
    if (err.name === 'MongoError' && err.code === 11000) {
      msg = 'Snippet Name Already Exists.'
    } else if (err.name === 'ValidationError') {
      console.log(err)
      msg = 'Snippet Code or Snippet Name cannot be left blank.'
    } else {
      msg = "Some error in server."
    }

    res.send({
      StatusCode: 500,
      StatusMessage: msg
    })
  })
}).get('/:snippetName', (req, res) => {
  var snippetName = req.params.snippetName;
  Snippet.findOne({snippetName: snippetName}).then(result => {
    if(result!==null){
      console.log(result.code)
      res.render('index', {
        code: result.code,
        layout: 'main'
      })
    }
    else {
      res.StatusCode = 404,
      res.render('index', {
        layout: 'main',
        code: 'Error: 404, No such files!'
      })
    }
  })
})
module.exports = router;