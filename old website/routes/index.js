var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'jordancappy' });
});

/* GET all the other pages */
router.get('/:page', function(req, res, next) {
	res.render(req.params.page, {title: req.params.page});
});

module.exports = router;
