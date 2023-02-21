import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
    URL: {
        type: String,
    },
    title: { type: String, required: true },
    category: { type: String },
    articleBody: { type: String },
    imageFile: { type: String },
    fileType: { type: String },
    createdBy: { type: String, required: true },

},
    { timestamps: true }
)

var Article = mongoose.model('Article', articleSchema);

export default Article;