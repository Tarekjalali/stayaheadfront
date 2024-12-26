import axios from 'axios'
import { GETMYTASKS } from '../ActionTypes/TaskTypes'

require('dotenv').config()

const API_BASE_URL = process.env.API_BASE_URL

export const getmytasks =(id)=>async(dispatch)=>{

    try {
        const res = await axios.get(`${API_BASE_URL}/api/tasks/getmyTasks/${id}`)

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
        await axios.post(`${API_BASE_URL}/api/tasks/createTask`,task)
        dispatch(getmytasks(id))
    } catch (error) {
        console.log(error)
    }

}

export const deleteTask=(TaskId , id)=>async(dispatch)=>{

    try {
        await axios.delete(`${API_BASE_URL}/api/tasks/createTask/api/tasks/deleteTask/${TaskId}`)

        dispatch(getmytasks(id))
    } catch (error) {
        console.log(error)
    }

}


export const updateTask =(taskId,id, changes)=>async(dispatch)=>{

    try {
        await axios.put(`${API_BASE_URL}/api/tasks/createTask/api/tasks/updateTask/${taskId}`,changes)

        dispatch(getmytasks (id))
    } catch (error) {
        console.log(error)
    }

}