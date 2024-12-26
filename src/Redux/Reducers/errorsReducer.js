import { CLEARERROR, HANDLEERROR } from "../ActionTypes/errorTypes"

const initialState = [] 

const errorsReducer =(state =initialState , action)=>{

    switch (action.type) {

        case HANDLEERROR : return [...state, action.payload] 
        
        case CLEARERROR : return state.filter((el,i,t)=>el.id !==action.payload)
        default: return state
    }

}


export default errorsReducer