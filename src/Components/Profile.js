"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcurrentuser, logout } from "../Redux/Actions/userActions";
import { addTask, deleteTask, done, getmytasks,  today, updateTask } from "../Redux/Actions/TaskActions";

import { Button, Popover, Label, Modal, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import Account from "./Account";


const Profile = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const todayDate = new Date().toISOString().split('T')[0];
  
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [task , setTask] = useState({})

  const [newTitle, setNewTitle] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  

  const handleUpdateTask=(a)=>{
    a.preventDefault();
    dispatch(updateTask(task._id, user._id,{title : newTitle , deadline :newDeadline}));
    setOpenModal(false)

  }


    
  

  const handleOpenModal=(targetTask)=>{
    setTask(targetTask);
    setOpenModal(true)
  }
  
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(getcurrentuser());
  }, []);

  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user?._id) dispatch(getmytasks(user._id));
  }, [dispatch, user?._id]);

  const myTasks = useSelector((state) => state.taskReducer.myTasks);

  const handleSave = (a) => {
    a.preventDefault();
    dispatch(addTask(user._id, { title, deadline, Taskowner: user._id }));
    setOpenPopover(false);
    setTitle("");
    setDeadline("");
  };

  const handleCancel = () => {
    setOpenPopover(false);
    setTitle("");
    setDeadline("");
  };

  return (


    <div>
    <div
  style={{
    backgroundImage: "url('https://i.ibb.co/0YmCPp4/f-enhanced.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
  }}
>
  <div
    style={{
      position: "absolute", 
      top: "2%", 
      left: "10%",
      right: "10%",
      padding: "0 10px", 
      textAlign: "center", 
    }}
  >
    <h1
      style={{
        fontSize: "2rem", 
        fontWeight: "bold",
        marginBottom: "10px",
      }}
    >
      {`Welcome, ${user?.name}!`}
    </h1>
    <h1
      style={{
        fontSize: "1rem", 
        lineHeight: "1.5", 
      }}
    >
      {`Every task you tackle today brings you closer to your goals—let's make it happen!`}
    </h1>
  </div>

      <div
  style={{
    position: "fixed",
    top: "330px",
    left: "50%", 
    transform: "translateX(-50%)", 
    height: "350px",
    width: "90vw",  
    maxWidth: "790px", 
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "8px",
    boxSizing: "border-box", 
  }}
>
  {myTasks &&
    myTasks.map((el) => (
      <div key={el._id} style={{ display: "flex", marginBottom: "10px", justifyContent :'space-evenly' }}>
       <h3
  style={{
    width: "calc(100% - 240px)", 
    fontSize: "large",
    textDecoration: el.isDone ? "line-through" : "none",
    overflowWrap: "break-word", 
  }}
>
  {el.title}
</h3>
        <h3 style={{ marginRight: "15px", fontSize: "large" }}>
          {el.deadline
            ? el.deadline.slice(0, 10).split("-").reverse().join("-")
            : "no deadline"}
        </h3>

        <div style={{ display: "flex", width: "100px", justifyContent: "space-evenly" }}>
          <svg
            onClick={() =>
              dispatch(updateTask(el._id, user._id, { isDone: !el.isDone }))
            }
            style={{ cursor: "pointer" }}
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <svg
            onClick={() => handleOpenModal(el)}
            style={{ cursor: "pointer" }}
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>

          <svg
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(deleteTask(el._id, user._id))}
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </div>
      </div>
    ))}
</div>


<Account  ></Account>

<div>
  <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>Edit Task</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">

                <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
              <div>
                
                <div className="mb-2 block">
                  <Label value="Task title" />
                </div>
                <TextInput
  style={{
    width: '100%', 
    maxWidth: '560px', 
    padding: '8px', 
    fontSize: '1rem', 
  }}
  placeholder="Enter your task here" 
  onChange={(e) => console.log(e.target.value)} 
/>
                <div className="mb-2 block">
                  <Label value="Deadline" />
                </div>
                <TextInput
                  type="date"
                  
                  onChange={(e)=>setNewDeadline(e.target.value)}
                 
                />
              </div>
              <div className="flex gap-2">
                <Button color="gray" onClick={()=>setOpenModal(false)}>
                  Cancel
                </Button>
                <Button color="success" onClick={(e)=>handleUpdateTask(e)}>
                  Save
                </Button>
              </div>
            </div>
                  
                </div>
              </Modal.Body>
              
            </Modal>
</div>

    

      <div style={{ position: "fixed", top: "210px", left: "30px" ,zIndex :'10'}}>
        <Popover 
          aria-labelledby="create-task-popover"
          open={openPopover}
          onOpenChange={setOpenPopover}
          content={
            <div  className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
              <div>
                <h3
                  id="create-task-popover"
                  className="text-base font-medium text-gray-900 dark:text-white"
                >
                  Create a new Task
                </h3>
                <div className="mb-2 block">
                  <Label value="Task title" />
                </div>
                <TextInput
                  placeholder="What's the task?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="mb-2 block">
                  <Label value="Deadline" />
                </div>
                <TextInput
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button color="gray" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button color="success" onClick={(e) => handleSave(e)}>
                  Save
                </Button>
              </div>
            </div>
          }
        >
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add a Task
          </button>
        </Popover>
        </div>

        <Link to={'/'}>
  <button
    style={{
      position: 'fixed',
      top: '160px',
      right: '20px',
    }}
    type="button"
    className="responsive-button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    Home
  </button>
</Link>

          
<div
  style={{
    position: "fixed",
    top: "250px",
    left: "50%", 
    transform: "translateX(-50%)", 
    display: "flex",
    justifyContent :'space-around',
    flexWrap: "wrap", 
    gap: "5px", 
    width: "90vw", 
    maxWidth: "700px", 
    padding: "10px",
    boxSizing: "border-box",
  }}
>
  <button
    onClick={() => dispatch(today(todayDate))}
    style={{
      background: "linear-gradient(to right, #fffdd0, #f5f5dc)",
      width: "33%", 
    }}
    type="button"
    className="text-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    For Today
  </button>

  <button
    onClick={() => dispatch(done())}
    style={{
      background: "linear-gradient(to right, #fffdd0, #f5f5dc)",
      width: "25%", 
    }}
    type="button"
    className="text-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    Done
  </button>

  <button
    onClick={() => dispatch(getmytasks(user._id))}
    style={{
      background: "linear-gradient(to right, #fffdd0, #f5f5dc)",
      width: "25%", 
    }}
    type="button"
    className="text-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    Reset
  </button>



          
          
          
          
          
</div>
    </div>
    </div>
  );
};

export default Profile;
