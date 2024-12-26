import { GETMYTASKS } from "../ActionTypes/TaskTypes"

const initialState = {
    myTasks :[]
}

const taskReducer =(state = initialState , action)=>{

    switch (action.type) {
        case GETMYTASKS : return {...state, myTasks : action.payload}
        default: return state
    }

}

export default taskReducer