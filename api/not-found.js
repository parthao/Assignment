const express = require('express');
const app = express.Router();
const config =require('config')

app.get("/",(request,response)=>{
    response.send("Page Not Found".json());
});



module.exports = app;