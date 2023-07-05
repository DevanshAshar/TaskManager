const jwt = require('jsonwebtoken')
const User=require('../Models/user')
const authentication={

    verifyToken:async(req,res,next)=>{
    try {
        let token=req.header('Authorization')
        if(typeof(token)==="undefined")
        return res.status(401).json({error:'Unauthorized'})
        if(token)
        {
            try {
                const data=jwt.verify(token,process.env.SECRET_KEY)
                const user=await User.findOne({email:data.email})
                userData=user
                next()
            } catch (error) {
                return res.status(400).json(error.message)
            }
        }
    
}catch (error) {
    return res.status(401).send(error.message)
}
},



admin:async(req,res,next)=>{
    try {
        let token=req.header('Authorization')
        const data=jwt.verify(token,process.env.SECRET_KEY)
        const user=await User.findOne({email:data.email})
        userData=user
        if(userData.role==='admin')
        next()
        else
        return res.status(401).json({error:'not an admin'})
    } catch (error) {
       res.status(404).json({error:error.message}) 
       console.log(error.message)
    }
}

}

module.exports=authentication