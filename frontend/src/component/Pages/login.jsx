import React from 'react'
import {Link, NavLink} from 'react-router-dom'

export default function login() {

  return (
    <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
      <div className=' max-w-6xl mx-auto sm:px-6 lg:px-8'> 
         <div className='mt-2 overflow-hidden shadow-2xl border-white ' >
            <h2 className='text-2xl'>Login</h2>
      
         <form className="p-5 flex flex-col justify-center">
                            <div className="flex flex-col">
                                <label for="Username" className="flex font-bold text-lg">
                                    Username
                                </label>
                                <input
                                    type="username"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    className="w-100 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col mt-2 ">

                                <label for="Password" className="flex font-bold text-lg">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="Password"
                                    id="Password"
                                    placeholder="Password"
                                    className="w-100 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            

                            <button
                                type="login"
                                className="md:w-100  bg-blue-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-blue-600 transition ease-in-out duration-300"
                            >
                                Login
                            </button>
                            <button onClick={() => console.log('Button clicked!')} className='mt-2 hover:text-purple-800'>Signup With Google </button>
                           <div className='flex'> <p className='mt-2'>Don't have an account?</p>
                            <NavLink
                             to="/Signup"
                             className={({isActive}) =>
                                 `block  duration-200 ${isActive ? "text-blue-800" : "text-blue-700"} hover:text-blue-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg mt-2 `
                             }
                        >
                            Register
                        </NavLink>
                        </div>
                        </form>
           
       </div>
       </div>
      
      </div>
  )
}

