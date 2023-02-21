import mongoose from 'mongoose'

const formSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    placeHolder: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: false
    },
    isMultiSelect: {
        type: Boolean,
        default: false,
        required: false
    },
    required: {
        type: Boolean,
        default: false,
        required: true

    },
    order: {
        type: Number,
        required: true,
        default: 0
       
       
    
    },
    status : {
        type: Boolean,
        default: true,
        required: true
    },
    hasButton: {
        type: Boolean,
        default: false,
        required: true
    },
    buttonText: {
        type: String,
        required: false
    },
})


// // increment order number by 1 after the last greatest order number
// formSchema.pre('save', function (next) {
//     const form = this
//     Form.findOne({}).sort({ order: -1 }).exec((err, form) => {
//         if (err) {
//             return next(err)
//         }
//         if (form) {
//             form.order = form.order + 1
//         }
//         next()
//     })
// })




const Form = mongoose.model('Form', formSchema)

export default Form;
