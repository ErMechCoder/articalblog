import Contest from '../models/contest.js';


export const createContest = async (req, res) => {
    try {
        const { entry, firstName,lastName, email, subject, desc, file } = req.body;
        const { link, type } = file;
        
        const contest = new Contest({
            entry,
            name: firstName + ' ' + lastName,
            email,
            subject,
            desc,
            file: {
                link,
                type
            }
        })
        await contest.save();


        res.status(201).json({contest})

    } catch (error) {
        res.status(500).json(error.message)

    }

}
export const getContests = async (req, res) => {
    try {
        const contests = await Contest.find()
        res.status(200).json(contests)
    } catch (error) {
        res.status(500).json(error.message)
    }
}