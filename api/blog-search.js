const express = require('express');
const app = express.Router();
const config =require('config')
const _ = require("lodash");

let options = {
   
    headers: { 
    'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
    'Content-Type': 'application/json'
}
}

const url = config.MainURL+'/api/rest/blogs';
console.log(url);
app.get("/:query",(request,response)=>{
    fetch(url,options)
    .then(res =>(res.json()))
    .catch(error=>{
        console.log(error)
    })
    .then(ddataa=>{
        const userInput = request.params.query; 
        let responseData = ddataa.blogs;
          var results=_.filter(responseData,function(item){
            return (item.title).toLowerCase().indexOf(userInput.toLowerCase())>-1;
            });
        response.send(results)
    })
});


module.exports = app;