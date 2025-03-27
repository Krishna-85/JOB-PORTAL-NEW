import express from 'express'
import { applyForJob,  getUserApplications, getUserData, updateUserResume } from '../controllers/userController.js'
import upload from '../Config/multer.js'


const router = express.Router()

// Get User Data
router.get('/user', getUserData)


// Apply for a job
router.post('/apply', applyForJob)

// Get applied jobs data
router.get('/applications', getUserApplications)

// Update user Profile
router.post('/update-resume', upload.single('resume'), updateUserResume)

export default router;