import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Redux/Actions/userActions';
import { Link } from 'react-router-dom'; // Import Link for routing

const Login = () => {
  const errors = useSelector(state => state.errorsReducer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, navigate));
  };

  return (
    <div
      className="relative flex justify-center items-center w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/T09vbp1/log-enhanced.png')" }}
    >
      <Link to="/">
        <button
          type="button"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center absolute top-5 left-5"
        >
          Home
        </button>
      </Link>

      <div className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
        {/* Displaying errors */}
        {errors.length !== 0 && errors.map((el, i) => <h1 key={i}>{el.msg}</h1>)}

        <form className="w-full" onSubmit={handleLogin}>
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

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>

        {/* Link to Register page */}
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Don't have an account?{' '}
            <Link
              to="/Register"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
            >
              Create one
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            If you have already created an account and didn't activate it Click the link to go to the{' '}
            <Link
              to="/Activation"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
            >
              activation page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
