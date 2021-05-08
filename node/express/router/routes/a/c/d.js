const router = require('express').Router();


router.get('/', (req, res, next) => {
  res.send('d');
  next();
});

module.exports = router