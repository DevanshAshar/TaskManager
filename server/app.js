const express=require('express')
const morgan=require('morgan')
const cors = require('cors')
const dotenv=require('dotenv').config()
const app=express()
const user=require('./Routes/user')
require('./dbConnect')
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/user',user)

app.use((req,res,next)=>{
    res.status(404).json({
        error:'not found'
    })
})
app.listen(5000,()=>{
    console.log(`Server listening on 5000`)
})