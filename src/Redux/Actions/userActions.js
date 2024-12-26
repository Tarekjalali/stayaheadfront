import axios from 'axios'
import { ACTIVATE, GETCURRENTUSER, LOGIN, LOGOUT, REGISTER } from '../ActionTypes/userTypes'
import { hadnleError } from './errorActions'



const API_BASE_URL = "https://stayahedback.onrender.com"


export const login =(credentials , navigate)=>async(dispatch)=>{

    try {

        const res = await axios.post(`${API_BASE_URL}/api/users/signin`, credentials)
        dispatch(
            {
                type : LOGIN,
                payload : res.data
            }
        )
        navigate('/Profile')
    } catch (error) {
        error.response.data.errors.forEach(element => {

            dispatch(hadnleError(element.msg))
            
        });
    }

}

export const register = (userData, onSuccess) => async (dispatch) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/createAccount`, userData);
      dispatch({
        type: REGISTER,
        payload: res.data.msg,
      });
  
      // Trigger the success callback (e.g., to open the modal)
      onSuccess();
    } catch (error) {
      error.response.data.errors.forEach((element) => {
        dispatch(hadnleError(element.msg));
      });
    }
  };

  export const activateAccount =(code)=>async(dispatch)=>{

    try {
        const res = await axios.get(`${API_BASE_URL}/api/users/activate/${code}`)
        dispatch(
            {
                type : ACTIVATE,
                payload : res.data.msg
            }
        )
    } catch (error) {
        error.response.data.errors.forEach(element => {

            dispatch(hadnleError(element.msg))
            
        });
    }

  }

  export const getcurrentuser =()=>async(dispatch)=>{

    try {
        const config = {headers : { authorized : localStorage.getItem('token')}}
        const res = await axios.get(`${API_BASE_URL}/api/users/getcurrentuser`,config)

        dispatch(
            { 
                type : GETCURRENTUSER,
                payload : res.data
            }
        )
        
    } catch (error) {
        error.response.data.errors.forEach(element => {

            dispatch(hadnleError(element.msg))
            
        });
    }

  }

  export const logout=()=>{

    return(
        {
            type : LOGOUT
        }
        
    )
    
  }

  export const deleteAccount =(id)=>async(dispatch)=>{

    try {
        await axios.delete(`${API_BASE_URL}/api/users/deleteAccount/${id}`)

        dispatch(logout())
    } catch (error) {
        console.log(error)
    }

  }

  export const updateAccount=(id, change)=>async(dispatch)=>{

    try {
        await axios.put(`${API_BASE_URL}/api/users/updateAccount/${id}`,change)

        dispatch(getcurrentuser())
    } catch (error) {
        console.log(error)
    }

  }

  export const updatePassword = (id, change) => async (dispatch) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/updatePassword/${id}`, change);
  
      
  
      
      return response.data;
    } catch (error) {
      console.error(error);
      // Return error response to handle it in the component
      return { success: false, message: error.response?.data?.msg || 'Error occurred' };
    }
  };