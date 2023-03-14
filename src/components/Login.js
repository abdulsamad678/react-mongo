import React, { Fragment, useContext, useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Icon from "react-feather";
import { MDBBtn } from 'mdb-react-ui-kit';
import { login } from "../actions/auth";
import '../../src/index'

const Login = ({login}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    console.log("auth"+JSON.stringify(auth))
    useEffect(() => {
        console.log("dddddddddddddddddd")
        console.log('user : ' + JSON.stringify(auth))
        if(auth.isAuthenticated == true){
          console.log("auth state : " + JSON.stringify(auth));
            console.log("ddddddddddddddddddjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
            // <NavLink to="/dash"></NavLink>
            navigate('/home');
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
         
        }
 
    },[auth]);
    const [form, setform] = useState({
        email:"",
        password:"",
    })
        let {email , password} = form ;
        const handleChange = (e) =>  {
          setform({...form, [e.target.name]: e.target.value} )
        }
        const onloginHandler = async (e) => {
          e.preventDefault();
    
          const data = {
            email:email,
            password:password
        }
        
        console.log("Current data is : " +JSON.stringify(data))
        console.log("after data"+ JSON.stringify(data))
        console.log(" In onLoginHandler") 
      
        dispatch(login(data));
        console.log("this is admin usre"+JSON.stringify(data))
        console.log("dispatch login "+ dispatch(login(data)))
      }
    return (
        <div
        className="image"
        style={{ height: "100vh", backgroundSize: "cover" }}
      >
        <div className="flex items-center justify-center h-screen">
      <form  onSubmit={onloginHandler} 
        className="bg-white p-6 rounded-lg shadow-xl"
      
      >
        <h2 className="text-lg font-medium mb-4">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
            
          >
            Email
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="email"
            id="email"
            name="email" value={email}  onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="password"
            id="password"
            name="password" value={password} onChange={handleChange}

          />
        </div>
        <button className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600">
          Submit
        </button>
      </form>
    </div>
    </div>
    )
}
Login.propTypes={ 
    login:PropTypes.func.isRequired,
}
  const mapDispatchToProps = (dispatch) => {
    return{
      login: (arg) => {
         dispatch(login(arg))
      }
    }
  }
  
export default connect(null, mapDispatchToProps)(Login)