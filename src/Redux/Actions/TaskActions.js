import axios from 'axios';
import { GETMYTASKS } from '../ActionTypes/TaskTypes';
import crypto from 'crypto';

// Decryption function (same as in backend, but here for frontend use)
function decryptTask(encryptedTask, iv) {
    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || 'your-256-bit-secret'; // Ensure this is your actual secret key
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedTask, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Action to get tasks (with decryption)
export const getmytasks = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`https://stayahedback.onrender.com/api/tasks/getmyTasks/${id}`);

        // Decrypt the task titles before dispatching them to the store
        const decryptedTasks = res.data.tasks.map((task) => ({
            ...task,
            title: decryptTask(task.title, task.iv), // Decrypt the title
        }));

        dispatch({
            type: GETMYTASKS,
            payload: decryptedTasks,
        });
    } catch (error) {
        console.log(error);
    }
};

// Action to add a task (send the encrypted title)
export const addTask = (id, task) => async (dispatch) => {
    try {
        // Encrypt the title before sending it to the backend
        const { encryptedTask, iv } = encryptTask(task.title);
        
        const newTask = { ...task, title: encryptedTask, iv: iv }; // Attach the encrypted title and IV

        await axios.post('https://stayahedback.onrender.com/api/tasks/createTask', newTask);
        dispatch(getmytasks(id));
    } catch (error) {
        console.log(error);
    }
};

// Action to delete a task
export const deleteTask = (TaskId, id) => async (dispatch) => {
    try {
        await axios.delete(`https://stayahedback.onrender.com/api/tasks/deleteTask/${TaskId}`);

        dispatch(getmytasks(id));
    } catch (error) {
        console.log(error);
    }
};

// Action to update a task (encrypt the updated title)
export const updateTask = (taskId, id, changes) => async (dispatch) => {
    try {
        if (changes.title) {
            // Encrypt the new title if it's being updated
            const { encryptedTask, iv } = encryptTask(changes.title);
            changes.title = encryptedTask;
            changes.iv = iv; // Attach the IV
        }

        await axios.put(`https://stayahedback.onrender.com/api/tasks/updateTask/${taskId}`, changes);
        dispatch(getmytasks(id));
    } catch (error) {
        console.log(error);
    }
};

// Helper function for encryption (same as backend)
function encryptTask(task) {
    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || 'your-256-bit-secret'; // Use your actual secret key
    const IV = crypto.randomBytes(16); // Random initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'), IV);
    let encrypted = cipher.update(task, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedTask: encrypted, iv: IV.toString('hex') };
}
