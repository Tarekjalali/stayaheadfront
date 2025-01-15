import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateAccount } from '../Redux/Actions/userActions';
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

const Activation = () => {
  const navigate = useNavigate();
  const activationMessage = useSelector(state => state.userReducer.activationMessage);
  const errors = useSelector(state => state.errorsReducer);
  
  const [code, setCode] = useState('');
  const [openModal, setOpenModal] = useState(true);
  
  const dispatch = useDispatch();

  const handleActivate = (e) => {
    e.preventDefault();
    dispatch(activateAccount(code));
  };

  const handleActivationMsg = () => {
    if (activationMessage.length === 0) {
      alert('Please activate your account first');
    } else {
      navigateToLogin();
    }
  };

  const navigateToLogin = () => {
    navigate('/Login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Activate your Account</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex w-full max-w-md flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="mb-2 block">
                <Label value={activationMessage} />
                {errors.length !== 0 && errors.map((el, i) => <h1 key={i}>{el.msg}</h1>)}
              </div>

              {/* TextInput with responsive width */}
              <TextInput
                onChange={(e) => setCode(e.target.value)}
                className="w-full sm:w-80" // full width on small screens, 80 on larger screens
                placeholder="Enter activation code"
              />
              
              {/* Button container */}
              <div className="flex gap-2 flex-wrap">
                <Button color="gray" onClick={handleActivationMsg} className="w-full sm:w-auto">
                  Login
                </Button>
                <Button color="success" onClick={handleActivate} disabled={!code} className="w-full sm:w-auto">
                  Activate
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Activation;
