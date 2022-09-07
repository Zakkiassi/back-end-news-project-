const {getTopics} = require("./controllers/topics.controllers")
const {getArticles} = require ("./controllers/articles.controllers")
const express = require('express');
const app = express()



app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id',getArticles )

app.use((err,req,res,next)=>{
    if(err.status && err.message){
        res.stastus(500).send({message: err.message});
    }
    res.status(500).send({message:'Internal Server Error'})
})


app.all("*",(req,res,next) => {
    res.status(404).send({msg:"file not found"})
})

app.use((err, req, res, next)=> {
    console.log(err)
    res.status(500).send({msg: "internal serv error"})
})

module.exports = app
