import axios from 'axios';

import{
    REGISTER_SUCESS,
    REGISTER_FAIL,
    LOGIN_PASS,
    LOGIN_FAIL,
    FETCH_ALL_USERS,
    FETCH_ALL_USERS_FAILED,
    ALL_USERS,
    ALL_USERS_FAILED,
    SEARCH_PASSED,
    SEARCH_FAILED,
}from '../actions/types'



export const register = (formData) => async dispatch=>{
    console.log("DDDDDDDDD")
    const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
    try {
        axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.getItem('token')}`}
        const res = await axios.post("http://localhost:5008/api/user", formData, config);
        console.log("res.data.data sucess : " +JSON.stringify(res))
        if(res.data.data.success){
          console.log("in sucess case ")
          dispatch({
            
              type: REGISTER_SUCESS,
              payload: res.data,
            });
            console.log("payload"+ JSON.stringify(res.data))
        }else{
          console.log("res.data.data in error: " + JSON.stringify(res))
          alert("err.message : " + res.data.data.message)
          dispatch({
              type: REGISTER_FAIL,
              payload: res.data,
            });
        }
        
      } catch (err) {
        return ({ data:
          {
              
              message : 'Internal Server Error :'+err.message
          }
      })
      }
    
}

export const login = (formData) => async dispatch=>{
  console.log("DDDDDDDDD")
  const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
  try {
      console.log("formData"+ JSON.stringify(formData))
      axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.getItem('token')}`}
     
      const res = await axios.post("http://localhost:5008/api/user/login", formData, config);
      console.log("res.data.data sucess : " +JSON.stringify(res))
      if(res.data.data.success){
        console.log("in sucess case of login ")
        dispatch({
            type: LOGIN_PASS,
            payload: res.data,
          });
          console.log("payload"+ JSON.stringify(res.data))
      }else{
        console.log("res.data.data in error: " + JSON.stringify(res))
        alert("err.message : " + res.data.message)
        dispatch({
            type: LOGIN_FAIL,
            payload: res.data,
          });
      }
      
    } catch (err) {
      return ({ data:
        {
            
            message : 'Internal Server Error :'+err.message
        }
    })
    }
  
}
//////////////////////////////////////get all users

export const getusers = (formData) => async dispatch=>{
  console.log("DDDDDDDDD")
  const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
  try {
      console.log("formData"+ JSON.stringify(formData))
      axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      const res = await axios.get("http://localhost:5008/api/user/active/user", formData, config);
      if(res.data.data.success){
      
        dispatch({
            type: FETCH_ALL_USERS,
            payload: res.data,
          });
          
      }else{
        
        alert("err.message : " + res.data.message)
        dispatch({
            type: FETCH_ALL_USERS_FAILED,
            payload: res.data,
          });
      }
      
    } catch (err) {
      return ({ data:
        {
            
            message : 'Internal Server Error :'+err.message
        }
    })
    }
  
}
////////////////////////////all users
export const allusers = (formData) => async dispatch=>{
  console.log("DDDDDDDDD")
  const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
  try {
      console.log("formData"+ JSON.stringify(formData))
      axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      const res = await axios.get("http://localhost:5008/api/user", formData, config);
      console.log("res.data.data sucess : " +JSON.stringify(res))
      if(res.data.data.success){
        console.log("in sucess case of login ")
        dispatch({
            type: ALL_USERS,
            payload: res.data,
          });
          console.log("payload"+ JSON.stringify(res.data))
      }else{
        console.log("res.data.data in error: " + JSON.stringify(res))
        alert("err.message : " + res.data.message)
        dispatch({
            type: ALL_USERS_FAILED,
            payload: res.data,
          });
      }
      
    } catch (err) {
      return ({ data:
        {
            
            message : 'Internal Server Error :'+err.message
        }
    })
    }
  
}
///////////////////SEARCH ALL USERS

export const searchusers = (formData) => async dispatch=>{
  debugger
  console.log("DDDDDDDDD")
  const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
  try {
      console.log("formData"+ JSON.stringify(formData))
      axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      const res = await axios.get(`http://localhost:5008/api/user/search/${formData.search_text}`, config);
      console.log("res.data.data sucess : " +JSON.stringify(res))
      if(res.data.data.success){
        console.log("in sucess case of user search ")
        dispatch({
            type: SEARCH_PASSED,
            payload: res.data,
          });
          console.log("payload"+ JSON.stringify(res.data))
      }else{
        console.log("res.data.data in error: " + JSON.stringify(res))
        alert("err.message : " + res.data.message)
        dispatch({
            type: SEARCH_FAILED,
            payload: res.data,
          });
      }
      
    } catch (err) {
      return ({ data:
        {
            
            message : 'Internal Server Error :'+err.message
        }
    })
    }
  
}