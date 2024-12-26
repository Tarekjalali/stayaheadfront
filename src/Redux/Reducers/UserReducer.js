import { ACTIVATE, FAIL, GETCURRENTUSER, LOGIN, LOGOUT, REGISTER } from "../ActionTypes/userTypes"

const initialState = {
    user :{},
    errors : [],
    activationMessage :""
    
}

const userReducer =(state = initialState , action)=>{

    switch (action.type) {
        
        case LOGIN : localStorage.setItem('token',action.payload.token)
        return {...state , user : action.payload.found }
        case GETCURRENTUSER : return {...state , user : action.payload}
        case REGISTER : return {...state , activationMessage : action.payload}
        case ACTIVATE : return {...state , activationMessage : action.payload}
        case LOGOUT : localStorage.removeItem('token') 
        return {...state , user :{}}


        case FAIL : return {...state , errors : action.payload}
        default: return state
    }

}

export default userReducer