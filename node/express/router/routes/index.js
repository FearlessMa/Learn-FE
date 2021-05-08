const router = require('express').Router();


router.get('/', (req, res, next) => {
  res.send('1');
  next();
});

module.exports = router