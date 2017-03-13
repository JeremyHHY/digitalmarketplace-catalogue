var express = require('express')
var router = express.Router()
var fs = require('fs');
var yaml = require('js-yaml');

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

module.exports = router

router.get('/:page/:yml', function (req, res) {
  var templateData = yaml.safeLoad(
    fs.readFileSync(__dirname + '/yml/' + req.params.yml + '.yml', {encoding: 'utf-8'})
  );

  Object.keys(req.query).map(function(key) {
    templateData[key] = req.query[key];
  });

  templateData.storedValues = req.cookies;

  console.log("--- GET", req.path);
  console.log(JSON.stringify(templateData, null, '  '));

  res.render(
    req.params.page,
    templateData
  );

});

router.post('/save', function (req, res) {
  Object.keys(req.body).filter(function(key) {
    // List of special keys that won't be stored in cookies
    return [
      'nextPage'
    ].indexOf(key) == -1;
  }).map(function(key) {
    res.cookie(key, req.body[key], { maxAge: 900000000, httpOnly: false});
    console.log("SAVE", key, req.body[key]);

  });

  res.redirect(req.body.nextPage);
});