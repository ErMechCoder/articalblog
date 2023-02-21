import axios from "axios";

const BASE_URL_QUOTE= "http://localhost:5000/quote";

class QuoteService {

    static async getAllQuotes() {
        const res = await axios.get(`${BASE_URL_QUOTE}/get-all`);
        return res;
    }
}


export default QuoteService;