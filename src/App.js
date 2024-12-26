
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import {Route, Routes } from 'react-router-dom';

import Profile from './Components/Profile';
import PrivateRoute from './Components/PrivateRoute';
import Account from './Components/Account';
import Activation from './Components/Activation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getcurrentuser } from './Redux/Actions/userActions';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) dispatch(getcurrentuser());
    }, []);

    const user = useSelector(state=>state.userReducer.user)
  return (
   <div>

    
    <Routes>

      
      <Route element={<Home></Home>} path='/'></Route>
      <Route element={ <Login></Login>} path='/Login'></Route>
      <Route element={<Register></Register>} path='/Register'></Route>
      <Route element={<PrivateRoute><Profile/></PrivateRoute>} path='/Profile'></Route>
      <Route element={<Account/>} path='/ManageAccount'></Route>


      <Route element={<Activation/>} path='/Activation'></Route>
   
    </Routes>
   </div>
  );
}

export default App;
