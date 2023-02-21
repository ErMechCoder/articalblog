import axios from  'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:5000/user';

class AuthService{
    static async login(user){
        const response = await toast.promise(
            axios.post(`${BASE_URL}/login`, user),
            {
                pending: "Logging in...",
                success:
                    "Login successful",
                error: "Something went wrong",
                position: toast.POSITION.BOTTOM_RIGHT,
            }
        );
        return response
    }
   static async register(user){
        const response = await toast.promise(
            axios.post(`${BASE_URL}/register`, user),
            {
                pending: "Processing...",
                success:
                    "Registration successful",
                error: "Something went wrong",
                position: toast.POSITION.BOTTOM_RIGHT,
            }
        );
        return response;
    }
    logout(){
        return axios.post(`${BASE_URL}/logout`);
    }
  static async  getUsers(){
      const token=JSON.parse(localStorage.getItem('user')).token;

    const res=await axios.get(`${BASE_URL}/users`,{
        headers:{
            'token':'Bearer '+token
        }
    });
    return res;
        
    }



}

export default AuthService;