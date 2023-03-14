import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route, Routes ,Router, Switch,} from "react-router-dom";
//import { Provider } from 'react-redux';
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';
const AppRouter=()=>{
    return (
        
            <BrowserRouter>
            <>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
              </>
            </BrowserRouter>

    )};

export default AppRouter;
