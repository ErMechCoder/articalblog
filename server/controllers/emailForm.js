import EmailForm from "../models/emailForm.js";



export const saveEmailForm=async (req,res)=>{
    const {comment,email,firstName,lastName,company}=req.body;
    const name=firstName+" "+lastName;

    try {
        const emailForm=new EmailForm({
            comment,
            email,
            name,
            company,
        })
        await emailForm.save();
        res.status(200).json({
            message:"Email form saved successfully",
            data:emailForm
        })
        
    } catch (error) {
        console.log(error);
    }
        
    
}