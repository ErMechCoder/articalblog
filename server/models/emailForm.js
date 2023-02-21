import mongoose from 'mongoose';

const emailForm = mongoose.Schema({
    comment: { type: String},
    email: { type: String},
    name: { type: String},
    company: { type: String},
   
    
    
}, { timestamps: true }
)

var EmailForm = mongoose.model('Email_Form', emailForm);

export default EmailForm;