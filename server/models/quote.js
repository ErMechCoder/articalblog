import mongoose from 'mongoose';

const quoteSchema = mongoose.Schema({
    quote: { type: String, required: true },
    writer: { type: String, required: true },

},
    { timestamps: true }
)

var Quote = mongoose.model('Quotes', quoteSchema);

export default Quote;