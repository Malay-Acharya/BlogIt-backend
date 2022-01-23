const express = require('express')
const app = express()
const port = process.env.port || 1337
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/usermodel')
const Article = require('./models/datamodel')
const jwt = require('jsonwebtoken')
const connectDB = require("./Connection")

app.use(cors())
app.use(express.json())



connectDB();


app.post('/api/register', async (req, res) => {
    try{
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if(!emailRegexp.test(req.body.email)){
            res.json({status:'Enter a valid mail'})
            return;
        }
        const user = await User.findOne({
            email: req.body.email,
        })
        if(user){
            res.json({status:'Email already in use'})
        }
        else{
        if(!req.body.name){
            res.json({status:'Enter name'})
        }
        else if(!req.body.email){
            res.json({status:'Enter email'})
        }
        else if(!req.body.password){
            res.json({status:'Enter password'})
        }
        else{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        console.log(user);
        res.json({status: 'ok'})
    }
    }
    }catch(err){
        res.json({status: err})
    }
})

app.post('/api/login', async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        if(user){
            const token = jwt.sign({
                name: user.name,
                email:user.email
            }, 'secret123')

            return res.json({status:'ok', user:token})
        }else{
            return res.json({status:'Wrong credentials'})
        }
    }catch(err){
        console.log(err);
    }
})

app.post('/api/submit', async (req, res) => {
    try{
        let img = "https://picsum.photos/1400/1067"
        if(!req.body.label){
            res.json({status:'Enter a valid label'})
        }
        else if(!req.body.head){
            res.json({status:'Enter a valid heading'})
        }
        else if(!req.body.cat){
            res.json({status:'Enter a valid category'})
        }
        else if(!req.body.content){
            res.json({status:'Enter a valid summary'})
        }
        else if(!req.body.main){
            res.json({status:'Enter a valid blog'})
        }
        else{
        const data = await Article.create({
            name: req.body.name,
            email: req.body.email,
            label: req.body.label,
            head: req.body.head,
            content: req.body.content,
            cat: req.body.cat,
            main: req.body.main,
            image: req.body.image||img
        })
        res.json({status:'Article submitted successfully'})
    }
    }catch(err){
        res.json({status: err});
    }
})

app.get('/api/finddata/:UserId', async (req,res) =>{
    try{
        var id = req.params.UserId.slice(7)
        console.log(id)
        const articles = await Article.find({_id : id })
        res.json({data: articles})
    }catch(err){
        console.log(err)
    }
})

app.get('/api/getdata', async (req,res) =>{
    try{
        const articles = await Article.find()
        res.json({data: articles})
    }catch(err){
        console.log(err)
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))