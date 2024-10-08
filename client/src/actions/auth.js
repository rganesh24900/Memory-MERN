import * as api from '../api';
import { FETCH_ALL,CREATE, UPDATE, DELETE, LIKE, AUTH } from "../constants/actionTypes";

export const signin = (formData,history) => async(dispatch)=>{
    try{
    //login the user
    const {data} = await api.signIn(formData);
    dispatch({type: AUTH,data});
    history.push('/');
    }
    catch(error){
        console.log(error)
    }
}
export const signup = (formData,history) => async(dispatch)=>{
    try{
    //signup the user
    const {data} = await api.signUp(formData);
    dispatch({type: AUTH,data});
    history.push('/');
    }
    catch(error){
        console.log(error)
    }
}