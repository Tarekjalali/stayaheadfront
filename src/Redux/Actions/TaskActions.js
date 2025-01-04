import axios from 'axios'
import { DONE, GETMYTASKS,  TODAY } from '../ActionTypes/TaskTypes'

export const getmytasks =(id)=>async(dispatch)=>{

    try {
        const res = await axios.get(`https://stayahedback.onrender.com/api/tasks/getmyTasksDecrypted/${id}`)

        dispatch(
            {
                type : GETMYTASKS,
                payload : res.data.tasks
            }
        )
        
    } catch (error) {
        console.log(error)
    }

}


export const addTask=(id,task)=>async(dispatch)=>{

    try { console.log(id)
        console.log(task)
        await axios.post('https://stayahedback.onrender.com/api/tasks/createEncryptedTask',task)
        dispatch(getmytasks(id))
    } catch (error) {
        console.log(error)
    }

}

export const deleteTask=(TaskId , id)=>async(dispatch)=>{

    try {
        await axios.delete(`https://stayahedback.onrender.com/api/tasks/deleteTask/${TaskId}`)

        dispatch(getmytasks(id))
    } catch (error) {
        console.log(error)
    }

}


export const updateTask =(taskId,id, changes)=>async(dispatch)=>{

    try {
        await axios.put(`https://stayahedback.onrender.com/api/tasks/updateTask/${taskId}`,changes)

        dispatch(getmytasks (id))
    } catch (error) {
        console.log(error)
    }

}

export const today=(todayDate)=>{
    
    return {
        type: TODAY,
        payload : todayDate
    }
}

export const done =()=>{
    return{
        type :DONE
    }
}

