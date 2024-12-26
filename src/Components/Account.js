"use client";

import {Button, Modal, Drawer } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, updateAccount, updatePassword } from "../Redux/Actions/userActions";


const Account = () => {

    const [nameForm , setNameForm] = useState(false)
    const [newName , setNewName] = useState("")

    const [oldPass , setOldPass] = useState("")
    const [newPass , setNewPass] = useState("")

    const handleUpdatePassword = async (e) => {
      e.preventDefault();
    
      const result = await dispatch(updatePassword(user._id, { oldPass, newPass }));
    
      if (result.success) {
        alert('Password changed successfully');
        setPasswordForm(false);
        setIsOpen(false);
      } else {
        alert(result.message || 'Password change failed');
      }
    };

    const [passwordForm , setPasswordForm] = useState(false)
    const handleChangeName=(a)=>{
      a.preventDefault();
      dispatch(updateAccount(user._id,{name : newName}));
      setNameForm(false);
      setIsOpen(false)

    }

    const user = useSelector(state=>state.userReducer.user)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);

    const [openModal, setOpenModal] = useState(false);
  
    const handleClose = () => setIsOpen(false);
  
    return (
      <>
        <div className="flex min-h-[50vh] items-center justify-center">
        <button
  onClick={() => setIsOpen(true)}
  style={{ position: 'fixed', top: '170px', right: '100px' }}
  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
>
  Manage Account
</button>
        </div>
        <Drawer open={isOpen} onClose={handleClose} position="right">
          <Drawer.Header title="Manage Account" />
          <Drawer.Items>
            
            <div style={{display : "flex" , flexDirection : 'column'}}>
            <button onClick={()=>setNameForm(true)} style={{width : '152px'}} type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Change Name</button>
            
            {nameForm && 
            <div>
            <input onChange={(e)=>setNewName(e.target.value)} type="email"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={user.name}              
              required
            />
              <div style={{display :'flex' , gap :'10px' , marginTop :'5px' , marginBottom :'5px'}}>
              <Button color="gray" onClick={(e)=>handleChangeName(e)} > Save </Button>
              <Button color="gray" onClick={()=>setNameForm(false)}> Cancel</Button>
              
              </div>

            </div>}
            <button onClick={()=>setPasswordForm(true)} style={{width : '152x'}} type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Change Password</button>

            {passwordForm && 
            <div>
            <input onChange={(e)=>setOldPass(e.target.value)} type="password"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Old Password"              
              required
            />
            <input onChange={(e)=>setNewPass(e.target.value)} type="password"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="New Password"              
              required
            />
              <div style={{display :'flex' , gap :'10px' , marginTop :'5px' , marginBottom :'5px'}}>
              <Button color="gray" onClick={(e)=>handleUpdatePassword(e)} > Save </Button>
              <Button color="gray" onClick={()=>setPasswordForm(false)}> Cancel</Button>
              
              </div>

            </div>}
            
            
            
            <button onClick={() => setOpenModal(true)} style={{width : '152px'}} type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete Account</button>

            <>
      
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => dispatch(deleteAccount(user._id))}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
                
            </div>
          </Drawer.Items>
        </Drawer>
      </>
    );
  }

export default Account