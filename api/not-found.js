const express = require('express');
const app = express.Router();

app.get("/",(request,response)=>{
    response.send("Page Not Found");
});



module.exports = app;