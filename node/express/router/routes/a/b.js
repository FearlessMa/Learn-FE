const router = require('express').Router();


router.get('/', (req, res, next) => {
  res.send('b');
  next();
});

module.exports = router