import Promotion_2 from '../models/promotion_2.js';



export const createPromotion = async (req, res) => {
    try {

        const { imageFile,link } = req.body;

        const data = new Promotion_2({ imageFile,link });

        await data.save()

        res.status(201).json(data)

    } catch (error) {
        res.status(500).json(error.message)

    }

}
// Language: javascript
export const getPromotion_2 = async (req, res) => {
    try {
        const data = await Promotion_2.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const editPromotion_2 = async (req, res) => {
    try {
        const { imageFile,link } = req.body;
        const { id } = req.params;
        const data = await Promotion_2.findByIdAndUpdate(id, { imageFile,link },{new:true});
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const deletePromotion_2 = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Promotion_2.findByIdAndDelete(id);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
