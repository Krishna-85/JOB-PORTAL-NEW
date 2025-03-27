import jwt from 'jsonwebtoken'
import Company from '../models/company.js'



export const protectCompany = async ( req, res, next)=>{
    const token = req.headers.token

    if(!token){
      return res.json({success:false, message:'Not Authorized, Login Again'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
       // Iska main purpose yahi hai ki request me jo JWT token hai usse pata chal sake ki kaunsi company ka data fetch karna hai.
    req.company = await Company.findById(decoded.id).select('-password')

    next()

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

