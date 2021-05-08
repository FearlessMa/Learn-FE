const express = require('express');
const {router, registerRoute} = require('./router/index')
const app = express();

app.use(router)
app.listen(8080,()=>{
  console.log('serve is running at localhost:8080');
})