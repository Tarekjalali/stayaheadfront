import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { activateAccount, register } from '../Redux/Actions/userActions';
import { Button, Label, Modal, TextInput } from "flowbite-react";

const Register = () => {
  const activationMessage = useSelector(state => state.userReducer.activationMessage);
  const errors = useSelector(state => state.errorsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [code, setCode] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
  
   
    if (password !== passwordConfirm) {
      
      alert("Your passwords do not match");
    } else {
      
      dispatch(register({ name, email, password }, () => setOpenModal(true)));
    }
  };
  const handleActivationMsg = () => {
    activationMessage === "Account created. Please check your email to activate your account."
      ? alert('Please activate your account first')
      : navigateToLogin();
  };

  const handleActivate = (e) => {
    e.preventDefault();
    dispatch(activateAccount(code));
  };

  const navigateToLogin = () => {
    navigate('/Login');
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://i.ibb.co/wNj6bmh/reg-enhanced.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link to="/">
        <button
          type="button"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center absolute top-5 left-5"
        >
          Home
        </button>
      </Link>

      <div
        className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto px-4 py-6 bg-white rounded-lg shadow-lg"
        style={{ backgroundColor: 'rgba(255, 255, 255 , 0.9)' }}
      >
        {/* Displaying errors */}
        {errors.length !== 0 && errors.map((el, i) => <h1 key={i}>{el.msg}</h1>)}

        <form className="w-full" onSubmit={handleRegister}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="yourname@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Already have an account?{' '}
            <button
              onClick={navigateToLogin}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
            >
              Login instead
            </button>
          </p>
        </div>
      </div>

      {/* Modal for account activation */}
      <div>
  <Modal show={openModal} onClose={() => setOpenModal(false)}>
    <Modal.Header>Activate your Account</Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        <div className="flex w-full max-w-md flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <div className="mb-2 block">
              <Label value={activationMessage} />
              {errors.length !== 0 && errors.map((el, i) => <h1 key={i}>{el.msg}</h1>)}
            </div>
            <TextInput
              onChange={(e) => setCode(e.target.value)}
              className="w-full sm:w-80"  // Full width on small screens, 80 on larger screens
              placeholder="Enter activation code"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button color="gray" onClick={handleActivationMsg}>
              Login
            </Button>
            <Button color="success" onClick={handleActivate} disabled={!code}>
              Activate
            </Button>
          </div>
        </div>
      </div>
    </Modal.Body>
  </Modal>
</div>

    </div>
  );
};

export default Register;
