import axios from 'axios';
import {toast} from 'react-toastify';
 

// const BASE_URL = 'http://localhost:5000/form/';
const BASE_URL = 'http://localhost:5000/form';

export default class FormService {
    
        constructor( ) {
            this.form = {};
            this.form.label = "";
            this.form.inputText = "";
            this.form.type = "";
            this.form.options = [];
            this.form.required = false;
            this.form.order = 0;
            this.form.status = true;
            this.form.hasButton = false;
            this.form.buttonText = "";
        }
    
        async getForms() {
            try {
                const response = await axios.get(BASE_URL)
                return response;
            } catch (err) {
                console.error(err.message);
                return [];
            }
        }
    
        async getForm(id) {
            try {
                const response = await axios.get(`${BASE_URL}/${id}`);
                return response.data;
            } catch (err) {
                console.error(err.message);
                return [];
            }
        }
    
        async createForm(form) {
            try {
                const response=await toast.promise(
                    axios.post(`${BASE_URL}`, form),
                    {
                        pending: "Processing...",
                        success:
                            "Form created successfully",
                        error: "Something went wrong",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    }
                );
                return response;
            } catch (err) {
                console.error(err.message);
                return [];
            }
        }
    
        async updateForm(form) {
            try {
                const response = await axios.put(`http://localhost:5000/form/${form._id}`, form);
                return response.data;
            } catch (err) {
                console.error(err.message);
                return [];
            }
        }
    
        async deleteForm(id) {
            try {
               const response =await toast.promise(
                    axios.delete(`${BASE_URL}/${id}`),
                    {
                        pending: "Processing...",
                        success:
                            "Form deleted successfully",
                        error: "Something went wrong",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    }
                );
                return response;
                
            } catch (err) {
                console.error(err.message);
                return [];
            }
        }

        async updateStatus(id, status) {
            try {
               
                const response =await toast.promise(
                    axios.patch(`${BASE_URL}/status/${id}`, { status }),
                    
                        {
                            pending: "Processing...",
                            success:
                              "Status updated successfully",
                            error: "Something went wrong",
                            position: toast.POSITION.BOTTOM_RIGHT,
                          }
                    
                );
                return response;

            } catch (err) {
                console.error(err.message);
                return [];
            }
        }
        async setOrder(id, order) {
            try {
               
                const response =await axios.patch(`${BASE_URL}/set-order/${id}`, { order });        
                return response;

            } catch (err) {
                console.error(err.message);
                return [];
            }
        }

         
    
}

  