import mongoose from 'mongoose';

const promotion_2 = mongoose.Schema({
    imageFile: { type: [String]},
    link: { type: String},
    
    
}, { timestamps: true }
)

var Promotion_2 = mongoose.model('Promotion_2', promotion_2);

export default Promotion_2;