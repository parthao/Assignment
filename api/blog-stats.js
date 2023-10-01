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
//const url = config.MainURL+'/users';
console.log(url);
app.get("/",(request,response)=>{
    fetch(url,options)
   
    .then(res =>(res.json()))
    .then(ddataa=>{
       
        let responseData = ddataa.blogs;
        let blogCount = _.size(responseData);
        let allTitle = _.map(responseData, function title(n) {
            return n.title;
          })

          function Long_Run() {
            return allTitle.sort(function (a, b) {
                return b.length - a.length;
            })[0];
        }
        let store = Long_Run();
        let longBlog = _.find(responseData, ({"title":store}));

        //let search = responseData.filter(a=> _.values(a).some(b => b.includes("Privacy".title)))s
        let search = (data, term) => data.find(({title}) => title.toLowerCase().includes(term.toLowerCase()))

        var results=_.filter(responseData,function(item){
            return (item.title).toLowerCase().indexOf("Privacy".toLowerCase())>-1;
            });
        let privacyBlogCount = _.size(results);
        let uniqueFromTitle = _.uniq(allTitle);

        let mainData = [{
        "Total number of blogs":blogCount,
        "the blog with the longest title":longBlog,
        "Number of blogs with privacy in the title.":privacyBlogCount,
        "An array of unique blog titles":uniqueFromTitle
       }]
        response.send(mainData)
    })
    //.then(ddataa=>response.send(ddataa.blogs[0]))
    //response.send(response.json())
});


app.post("/",(request,response)=>{
    response.send("Sample POST is called.")
});


app.put("/",(request,response)=>{
    response.send("Sample PUT is called.")
});


app.delete("/",(request,response)=>{
    response.send("Sample DELETE is called.")
});

module.exports = app;