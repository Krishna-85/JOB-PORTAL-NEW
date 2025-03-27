import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  password: { type: String, required: true }
});


companySchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password, 10)
}

const Company = mongoose.model('Company', companySchema)
export default Company