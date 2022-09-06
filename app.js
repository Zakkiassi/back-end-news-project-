const {getTopics} = require("./controllers/topics.controllers")
const express = require('express');
const app = express()



app.get('/api/topics', getTopics)


app.all("*",(req,res,next) => {
    res.status(404).send({msg:"file not found"})
})

app.use((err, req, res, next)=> {
    console.log(err)
    res.status(500).send({msg: "internal serv error"})
})

module.exports = app
