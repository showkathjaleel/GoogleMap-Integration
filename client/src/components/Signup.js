import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth'
import { validateSignup } from '../utils/validation'


export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone,setPhone]=useState('')
    const [formError, setFormError] = useState({})
    const [IsRegistered,setIsRegistered]=useState(false)
    const navigate=useNavigate()
 

    useEffect(() => {
        if (Object.keys(formError).length === 0 && IsRegistered) {

        registerUser(username,email,password,phone).then((response) => {
              if (response) {
                // /means loginpage
                navigate('/')        
              } 
            });
        }
      }, [formError,IsRegistered]);


  const handleSignup = async (e) => {
    e.preventDefault();
    // setFormError(validateSignup(username,email,password,confirmPassword,phone));
    setIsRegistered(true);
  };

    return (
   <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                    Register
                </h1>
                <form
                    className="mt-6">
                          <div className="mb-2">
                            
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                        value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <h1>{formError?.username}</h1>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                        value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <h1>{formError?.email}</h1>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                        value={password}
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <h1>{formError?.password}</h1>

                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                          Confirm Password
                        </label>
                        <input
                        value={confirmPassword}
                            type="password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <h1>{formError?.confirmpassword}</h1>

                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            phone Number
                        </label>
                        <input
                        value={phone}
                            type="number"
                            onChange={(e) => setPhone(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <h1>{formError?.phone}</h1>
                    <div className="mt-6">
                        <button onClick={handleSignup} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link to="" className="font-medium text-purple-600 hover:underline cursor-pointer"
                    > Sign up </Link>
                </p>

            </div>
        </div>
    );
}
