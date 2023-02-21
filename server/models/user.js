import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: { type: String, required: true ,unique:true},
    name: { type: String },
    password: { type: String, required: true },
    interestProfile: { type: Array },

    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    agreeToTerms: { type: Boolean, default: false },
}, { timestamps: true })

const User= mongoose.model('user', userSchema);

export default User;

