import job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"


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
   
   const {jobId} = req.body

   const userId = req.auth.userId

   try {
    
    const isAlreadyApplied = await JobApplication.find({jobId, userId})

    if(isAlreadyApplied.length > 0){
        return res.json({success:false, message:'Already Applied'})
    }

    const jobData = await job.findById(jobId)
    

    // Debugging
    console.log(jobData);

    if(!jobData){
        return res.json({success:false, message:'Job Not Found'})
    }

    await JobApplication.create({
        companyId:jobData.companyId,
        userId,
        jobId,
        date: Date.now()
    })

    res.json({success:true, message:'Applied Successfully'})

   } catch (error) {
    res.json({success:false, message:error.message})
   }

}

// Get User applied Application
export const getUserApplications = async (req, res)=>{
     try {

        const userId = req.auth.userId

       const applications = await JobApplication.find({userId})
       .populate('companyId', 'name email image')
       .populate('jobId', 'title description location category salery')
       .exec()

       if(!applications){
        return res.json({success: false , message: 'No Job application found for this user'})
       }

       return res.json({success:true, applications})



     } catch (error) {
        res.json({success:false , message: error.message})
     }
}

// Update user Profile (resume)
export const updateUserResume = async (req,res)=>{

}