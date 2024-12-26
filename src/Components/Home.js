import React from 'react';
import { Link } from 'react-router-dom'
const Home = () => {

  const token = localStorage.getItem('token')
  return (
    
    <>
    
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px); /* Adjust for the "floating" effect */
            }
          }
        `}
      </style>
      
      <div 
        style={{
          backgroundImage: "url('https://i.ibb.co/qjSKhLh/7a17b1a0-5c5c-4678-9558-5e8f107716c1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
          
        }}
      >


        <div 
          style={{
            backgroundColor: 'mintcream',
            padding: '25px',
            borderRadius: '60px',
            animation: 'float 3s ease-in-out infinite',
            position : 'fixed',
            top :'150px',
            left :'200px'
          }}
        >
          <h1 
            className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              {"Stay Ahead of "}
            </span> 
            Your Schedule.
          </h1>
        </div>
        <div style={{position :'fixed' , top:'380px' , left :'900px' ,  animation: 'float 3s ease-in-out infinite'}}>

          {
            token ? <>
                    <Link to={'/Profile'}><button  type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">My Tasks</button></Link>

                    </> : <>
                    <Link to={'/Login'}><button  type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button></Link>
                    <Link to={'/Register'}><button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign Up</button></Link>

                    </>
          }
        </div>
      </div>
    </>
  );
};

export default Home;
