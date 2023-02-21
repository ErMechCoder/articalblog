import mongoose from 'mongoose';

const contest = mongoose.Schema({
    entry: { type: String},
    name: { type: String},
    email: { type: String},
    subject: { type: String},
    desc: { type: String},
    file: {type: Object,default: {
      link: String,
      type: String,
      
    }}
    
    
}, { timestamps: true }
)

var Contest = mongoose.model('Contest', contest);

export default Contest;