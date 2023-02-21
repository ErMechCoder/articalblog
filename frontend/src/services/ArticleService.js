

import axios from "axios";

const BASE_URL_ARTICLE = "http://localhost:5000/article";

const user= JSON.parse(localStorage.getItem("user"));
const TOKEN = user?.token;
/// send the token in the header
export const userRequest = axios.create({
    baseURL: BASE_URL_ARTICLE,
    headers: { token: `Bearer ${TOKEN}` },
});



class ArticleService {
  constructor() {
    this.userRequest = userRequest;
  }
    static async getAllArticles() {
        const res = await axios.get(`${BASE_URL_ARTICLE}/get-all`);
        return res;
    }
    
    static async getArticle(id) {
        const res = await axios.get(`${BASE_URL_ARTICLE}/get/${id}`);
        return res;
    }
    
    static async createArticle(article) {
      if(user){
       const res=userRequest.post(`${BASE_URL_ARTICLE}/create`,article);
        return res;
      } 
      else{
        return {
          status:401,
          message:"You are not authorized to create an article"
        }
      }
    }
    
    static async updateArticle(article) {
        const res = await axios.post(`${BASE_URL_ARTICLE}/update/${article._id}`, article);
        return res;
    }
    
    static async deleteArticle(id) {
        const res = await axios.post(`${BASE_URL_ARTICLE}/delete/${id}`);
        return res;
    }
    }

    export default ArticleService;