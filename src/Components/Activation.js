import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateAccount, register } from '../Redux/Actions/userActions';
import { Button, Label, Modal, TextInput } from "flowbite-react";

const Activation = () => {

    const activationMessage = useSelector(state=>state.userReducer.activationMessage)
    const [code, setCode] = useState('')
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(true)

    const handleActivate =(a)=>{
          a.preventDefault()
          dispatch(activateAccount(code))
        }
  return (
    <div>
              <Modal show={openModal} onClose={() => setOpenModal(false)}>
                          <Modal.Header>Activate your Account</Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6">
            
                            <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
                          <div>
                            
                            <div style={{width :'560px'}} className="mb-2 block">
                              <Label value={activationMessage} />
                            </div>
                            <TextInput onChange={(e)=>setCode(e.target.value)} style={{width :'320px'}}
                              placeholder="Enter activation code"                                
                              
                            />
                            
                           
                          </div>
                          <div className="flex gap-2">
                            <Button color="gray" onClick={()=>setOpenModal(false)}>
                              Cancel
                            </Button>
                            <Button color="success" onClick={(e)=>handleActivate(e)} >
                              Activate
                            </Button>
                          </div>
                        </div>
                              
                            </div>
                          </Modal.Body>
                          
                        </Modal>
            </div>
  )
}

export default Activation