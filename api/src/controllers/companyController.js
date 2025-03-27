import Company from "../models/company.js"
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'
import genrateToken from "../utils/generateToken.js"
import job from "../models/Job.js"


// Register a new company
export const registerCompany = async (req, res)=>{
     const { name, email, password} = req.body

     const imageFile = req.file

     if(!name || !email || !password || !imageFile){
        return res.json({success: false, message: "Missing Details"})
     }

     try {
        const companyExists = await Company.findOne({email})

        if(companyExists){
            return res.json({success: false, message:"Comapny already registerd"})
        }

        const hashPassword = await Company.hashPassword(password)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password:hashPassword,
            image:imageUpload.secure_url
        })

        res.json({
            success: true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token: genrateToken(company._id)
        })

    } catch (error) {
       res.json({success:false, message:error.message})
    }
}
      
// Company login
export const loginCompany = async (req, res)=>{
    const {email, password} = req.body

    try {
        const company = await Company.findOne({email})

        if (bcrypt.compare(password, company.password)) {
            res.json({
                success:true,
                company:{
                    _id:company._id,
                    name:company.name,
                    email:company.email,
                    image:company.image
                },
                token : genrateToken(company._id)
            })
        }
        else{
            res.json({success:false, message:"invalid email or password"})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// Get company data
export const getCompanyData = async (req, res)=>{
    
    try {
        const company = req.company
        
        res.json({success:true, company})
    } catch (error) {
        res.json({success:fale, message:error.message})
    }
   

}


// Post a new Job
export const postJob = async (req, res)=>{
   const {title, description, location, salery, level, category} = req.body

   const companyId = req.company._id

   try {
    
    const newJob = new job({
        title,
        description,
        location,
        salery,
        companyId,
        date: Date.now(),
        level,
        category
    })

    await newJob.save()

    res.json({success:true, newJob})

   } catch (error) {
    res.json({success:false, message:error.message})
   }
}


// Get company Job applicants
export const getCompanyJobApplicants = async (req, res)=>{
 
}


// Just Company Posted Jobs
export const getCompanyPostedJobs = async (req, res)=>{
  
    try {
        
        const companyId = req.company._id // ye company ki id mai hame auth middleware se mil rhi hai jo ki token ke payload mai padi hai.

        const jobs = await job.find({companyId})
        
        // (ToDo) Adding No. of applicants info in data

        res.json({success:true, jobsData:jobs})
        
    } catch (error) {
        res.json({succes:false , message:error.message})
    }

}

// Change Job application status
export const ChangeJobApplicationStatus = async (req, res)=>{

}


// Change Job Visiblty
export const changeVisiblity = async (req, res)=>{

    try {
        
        const {id} = req.body

        const companyId = req.company._id

        const Job = await job.findById(id)

        if(companyId.toString() === Job.companyId.toString()){
            Job.visible = !Job.visible
        }

        await Job.save()

        res.json({success:true, Job})



    } catch (error) {
        res.json({success:false , message:error.message})
    }

}


