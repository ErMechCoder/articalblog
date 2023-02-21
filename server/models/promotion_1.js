import mongoose from 'mongoose';

const promotion_1 = mongoose.Schema({
    imageFile: { type: [String]},
    link: { type: String},
    
    
}, { timestamps: true }
)

var Promotion_1 = mongoose.model('Promotion_1', promotion_1);

export default Promotion_1;