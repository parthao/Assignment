const express = require('express');
const app = express.Router();
const config =require('config')
const _ = require("lodash");




const url = config.MainURL+'/api/rest/blogs';
let recivedData

let options = {
   
    headers: { 
    'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
    'Content-Type': 'application/json'
}
}

var myFetch = (input) =>
{
    fetch(url,options)
    .then(res =>(res.json()))
    .catch(error=>{
        console.log(error)
    })
    .then(ddataa=>{
        let responseData = ddataa.blogs;

        var results=_.filter(responseData,function(item){
            return (item.title).toLowerCase().indexOf(input.toLowerCase())>-1;
            });

            recivedData=results
        return results;
    })

}

var chachMemory = _.memoize(function(result) {
    myFetch(result)
    return myFetch(result)
});

//var result = chachMemory(userInput);
console.log(url);
app.get("/:query",(request,response)=>{

    const userInput = request.params.query;
    myFetch(userInput);
    
    chachMemory(userInput)

    ///console.log(myFetch(userInput))
    console.log(chachMemory.cache)
   // var result = chachMemory(userInput);
    response.send(recivedData);
   //myCache(userInput);
   
});


module.exports = app;