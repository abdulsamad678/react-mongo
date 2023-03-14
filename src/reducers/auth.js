import {
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
}from '../actions/types';

const initialState={
    user:null,
    isAuthenticated:false,
    loading:false,
    success:false,
    users:null,
    allusers:null

};
export default function(state=initialState, action){
    const{type, payload}=action
    console.log("action"+JSON.stringify(action))
    switch (type) {
        case REGISTER_SUCESS:
            return{
                ...state,
                success:true,
                user:action.payload.user
            }

            case REGISTER_FAIL:
                return{
                    ...state,
                    success:false,
                    user:null
                }

            case LOGIN_PASS:
                localStorage.setItem('token', action.payload.data.token);
                console.log("action"+ JSON.stringify(payload))
                return{
                    ...state,
                    token:payload.data.token,
                    isAuthenticated:true,
                    success:true,
                    user:action.payload.user
                }
            case LOGIN_FAIL:
                localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                success:false,
                user:null
            }
        case FETCH_ALL_USERS:
            
        return {
          ...state,
          users: action.payload.data.users,
      };
      case FETCH_ALL_USERS_FAILED:
        
        return {
            ...state,
            users: null,
        };

        case ALL_USERS:
        console.log("allusers pass"+ JSON.stringify(payload))
        return {
            ...state,
            allusers: action.payload.data.allusers,
        };
        case ALL_USERS_FAILED:
        console.log("allusers failed"+ JSON.stringify(payload))
        return {
            ...state,
            allusers: null,
        };
        case SEARCH_PASSED:
        console.log("search pass"+ JSON.stringify(payload))
        return {
            ...state,
            allusers: action.payload.data.allusers,
        };
        case SEARCH_FAILED:
        console.log("search failed"+ JSON.stringify(payload))
        return {
            ...state,
            allusers: null,
        };
         default:
            return state;    
    }
}