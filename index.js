const express = require('express')
const config =require('config')
const app = express()
const mainRoute = require('./api/blog-stats')
const searchRoute = require('./api/blog-search')

app.use(express.json());
app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers', "*");
    response.setHeader('Access-Control-Allow-Methods',"*");
    next();
});

app.use('/api/blog-stats',mainRoute)

app.use('/api/blog-search',searchRoute)

app.listen(config.PORT, () => {
    console.log(`Node server listening on port : http://localhost:${config.PORT}`)
  })