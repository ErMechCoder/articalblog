import Promotion_1 from '../models/promotion_1.js';



export const createPromotion = async (req, res) => {
    try {

        const { imageFile,link } = req.body;

        const data = new Promotion_1({ imageFile,link });

        await data.save()

        res.status(201).json(data)

    } catch (error) {
        res.status(500).json(error.message)

    }

}
// Language: javascript
export const getPromotion_1 = async (req, res) => {
    try {
        const data = await Promotion_1.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const editPromotion_1 = async (req, res) => {
    try {
        const { imageFile,link } = req.body;
        const { id } = req.params;
        const data = await Promotion_1.findByIdAndUpdate(id, { imageFile,link },{new:true});
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const deletePromotion_1 = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Promotion_1.findByIdAndDelete(id);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
