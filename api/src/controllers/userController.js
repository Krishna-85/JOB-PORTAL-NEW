import User from "../models/User"


// Get user data
export const getUserData = async (req, res)=>{
   
    const userId = req.auth.userId

    try {
        
        const user = await User.findById(userId)

        if(!user){
            return res.join({success:false, message:'User Not Found'})
        }

        res.json({succes:true, user})

    } catch (error) {
        res.json({success:false, message:error.message})
    }

}


// Apply for a Job
export const applyForJob = async (req, res)=>{
   
}

// Get User applied Application
export const getUserApplications = async (req, res)=>{

}

// Update user Profile (resume)
export const updateUserResume = async (req,res)=>{

}