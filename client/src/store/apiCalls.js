import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./auth"
import {publicRequest} from '../requestMethods'
import { createFlashCardFailure, createFlashCardStart, createFlashCardSuccess, getFlashCardFailure, getFlashCardStart, getFlashCardSuccess } from "./flashCard";


//! Auth
export const login = async(dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('auth/login',user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure(err))
    }
}

export const register = async(dispatch,user)=>{
    dispatch(registerStart());
    try{
        const res = await publicRequest.post('auth/register',user)
        dispatch(registerSuccess(res.data))
    }catch(err){
        dispatch(registerFailure(err))
    }
}

export const getAllFlashCards = async(dispatch)=>{
    dispatch(getFlashCardStart());
    try {
        const res = await publicRequest.get("flash/flashCard");
        dispatch(getFlashCardSuccess(res.data));
    } catch (error) {
        dispatch(getFlashCardFailure(error));
    }
}

export const createFlashCard = async (dispatch, QAs) => {
    dispatch(createFlashCardStart());
    try {
      const res = await publicRequest.post("flash/flashCard", QAs);
      dispatch(createFlashCardSuccess(res.data));
    } catch (error) {
      // Check if the error is a response from the server
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with an error status:", error.response.status);
        console.error("Error data:", error.response.data);
  
        // You can dispatch an action with the error details if needed
        dispatch(createFlashCardFailure(error.response.data));
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
      }
  
      // Dispatch a general failure action if needed
      dispatch(createFlashCardFailure());
    }
  };
  


//export const logout = async(dispatch)=>{
    //dispatch(logoutStart());
    //try{
        //const res = await publicRequest.post('auth/logout')
        //dispatch(logoutSuccess(res.data))
    //}catch(err){
        //dispatch(logoutFailrue(err))
    //}
//}