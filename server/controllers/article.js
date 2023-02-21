import Article from "../models/article.js";

const urlify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "*") // reg ex
      .split("*")
      .filter((word) => word.length > 1)
      .join("-");
  };

export const createArticle = async (req, res) => {
    try {
        const URL=urlify(req.body.title);
        const article = new Article({
            ...req.body,
            URL,
        });
       
        await article.save()

        res.status(201).json(article)

    } catch (error) {
        res.status(500).json(error.message)

    }

}
export const getAllArticles= async (req, res) => {
    try { 
        const articles = await Article.find()
        res.status(200).json(articles)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
        
    
}
export const getArticle= async (req, res) => {
    try {
        const {_id} = req.params
        const article = await Article.findById(_id)
        res.status(200).json(article)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const editArticle = async (req, res) => {
    try {
        const { title, category, articleBody, imageFile } = req.body;
        const { _id } = req.params;
        const article = await Article.findByIdAndUpdate(_id, { title, category, articleBody, imageFile },{new:true})
        res.status(200).json(article)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const deleteArticle = async (req, res) => {
    try {
        const { _id } = req.params;
        const article = await Article.findByIdAndDelete(_id)
        res.status(200).json({message:"Article deleted successfully"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const getArticleByURL = async (req, res) => {
    try {
        const {URL} = req.params
        const article = await Article.findOne({URL})
        if(!article) return res.status(404).json({message:"Article not found"})
        res.status(200).json(article)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
