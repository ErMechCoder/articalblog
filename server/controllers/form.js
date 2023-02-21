import Form from "../models/form.js";



export const createForm = async (req, res) => {
    try {
        const lastIndex= await Form.find({}).sort({ order: -1 }).limit(1).exec();
        if(lastIndex.length>0){
            const form = new Form({
                ...req.body,
                order: lastIndex[0].order + 1
            })
            await form.save();
            res.status(201).json(form);
        }else{
            const form = new Form({
                ...req.body,
                order: 1
            })
            await form.save();
            res.status(201).json(form);
        }


    
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
    };


export const getForms = async (req, res) => {
    try {
        const forms = await Form.find();
        res.json(forms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(error);
    }
}

export const updateForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndUpdate(req.params.id, req.body);
        res.json(form);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(error);
    }
}
export const deleteForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        res.json(form);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(error);
    }
}


export const updateStatus = async (req, res) => {
    try {
        
        // update the status of the form
        const form = await Form.findById(req.params.id);
        form.status = req.body.status;
        await form.save();
        res.json(form);

    } catch (err) {
        console.error(err.message);
        res.status(500).send(error);
    }
}


export const setOrder = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        form.order = req.body.order;
        await form.save();
        res.json(form);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
}









