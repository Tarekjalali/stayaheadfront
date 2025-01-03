import { DONE, GETMYTASKS, TODAY } from "../ActionTypes/TaskTypes";

const initialState = {
  myTasks: [],
  filter : null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETMYTASKS:return { ...state, myTasks: action.payload };

    case DONE : return {...state, myTasks : state.myTasks.filter((el,i,t)=>el.isDone == true)}

   

    case TODAY:
      const todayDate = action.payload; // Expecting 'yyyy-mm-dd' format in the payload
      return {
        ...state,
        myTasks: state.myTasks.filter((task) => {
          const taskDate = new Date(task.deadline).toISOString().split('T')[0];
          return taskDate === todayDate;
        }),
      };
    
    default:
      return state;
  }
};

export default taskReducer;