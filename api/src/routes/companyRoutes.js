import express from 'express'
import { ChangeJobApplicationStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../Config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'


const router = express.Router()


// Regster a Company
router.post('/register', upload.single('image'), registerCompany)


// Company login
router.post('/login', loginCompany)


// Get Company data
router.get('/company',protectCompany, getCompanyData)


// Post a Job
router.post('/post-job',protectCompany, postJob)


// Get Applicants Data of company 
router.get('/applicants',protectCompany, getCompanyJobApplicants)


// Get company job list
router.get('/list-jobs',protectCompany, getCompanyPostedJobs)


// Change Application status
router.post('/change-status',protectCompany, ChangeJobApplicationStatus)


// Change application Visibility
router.post('/change-visiblity',protectCompany, changeVisiblity)


export default router