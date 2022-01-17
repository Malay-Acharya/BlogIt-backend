const express = require('express')
const app = express()
const port = 1337
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/usermodel')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/blogit')

app.post('/api/register', async (req, res) => {
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        console.log(user);
        res.json({status: 'ok'})
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
            return res.json({status:'error'})
        }
    }catch(err){
        console.log(err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))