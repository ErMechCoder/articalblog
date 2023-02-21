import Quote from "../models/quote.js";

export const createQuote = async (req, res) => {
    try {

        const { quote, writer } = req.body;

        const quoteData = new Quote({ quote, writer })

        await quoteData.save()

        res.status(201).json(quoteData)

    } catch (error) {
        res.status(500).json(error.message)

    }

}
export const getAllquotes= async (req, res) => {
    try { 
        const quotes = await Quote.find()
        res.status(200).json(quotes)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
        
    
}
export const deleteQuote = async (req, res) => {
    try {
        const { id } = req.params
        const quote = await Quote.findByIdAndDelete(id)
        res.status(200).json(quote)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const editQuote = async (req, res) => {
    try {
        const { id } = req.params
        const { quote, writer } = req.body
        const quoteData = await Quote.findByIdAndUpdate(id, { quote, writer },{new:true} )
        res.status(200).json(quoteData)
    } catch (error) {
        res.status(500).json(error.message)
    }
}