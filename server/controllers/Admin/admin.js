const AdminModel = require("../../models/Admin/admin");
const bcrypt=require("bcrypt");

exports.AdminSignup=async(req,res)=>{
    console.log(req.body);
    try {
        const {firstName,lastName,password,email}=req.body;
        const finduser=await AdminModel.findOne({email});
        if(finduser){
            return res.status(409).json({
                success:false,
                message:"User Already Exist"
            })
        }
        const hashpassword=await bcrypt.hash(password,10)
        const newUser=AdminModel({
          firstName,
          lastName,
          password:hashpassword,
          role:"admin",
          email
        })
        await newUser.save();
        res.status(200).json({
            success:true,
            message:"User Created Successfully",
            newUser

        })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.AdminLogin=async(req,res)=>{
 
    const {email,password}=req.body;
   
    try {
        const user=await AdminModel.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                msg:"user not found"
            })
        }
        
         const matchpassowrd= bcrypt.compare(password,user.password);
         console.log("passowrd matched",matchpassowrd);
         if(!matchpassowrd){
            return res.status(409).json({
                success:false,
                msg:'Password not matched'
            })
         }
        
        res.status(200).json({
            success:true,
            message:"User loged in Successfully",
            user
        })
    } catch (error) {
        res.status(500).send({message:error.message})
    }
  }