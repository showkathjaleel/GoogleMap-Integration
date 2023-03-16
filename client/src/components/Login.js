import React, { useState,useEffect } from 'react'
import { validateLogin } from '../utils/validation'
import { authUser } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState({})
    const [islogin,setIslogin]=useState(false)
    const [user,setUser]=useState('')
    const navigate=useNavigate()

    useEffect(() => {
        if (Object.keys(formError).length === 0 && islogin) {
        authUser(email,password).then((response) => {
              if (response) {
                setUser(response)
                navigate('/dashboard')        
              } 
            });
        }
      }, [formError,islogin]);


      const refreshToken = async () => {
        try {
          const res = await axios.post(`http://localhost:5000/auth/refresh`, { token: user.refreshToken });
          setUser({
            ...user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          });
          console.log(res.data,'res in refresh')
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };
    
      const axiosJWT = axios.create()
    
      axiosJWT.interceptors.request.use(
        async (config) => {
          let currentDate = new Date();
          const decodedToken = jwt_decode(user.accessToken);
          if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await refreshToken();
            config.headers["authorization"] = "Bearer " + data.accessToken;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );   

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError(validateLogin(password,email));
    setIslogin(true);
  };

    return (
   <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                    Sign in
                </h1>
                <form
                    className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
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
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <h1>{formError?.password}</h1>

                    <div className="mt-6">
                        <button onClick={handleLogin} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>

                </form>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    
                    <Link to="register" className="font-medium text-purple-600 hover:underline cursor-pointer"
                    > Sign up </Link>
                   
                </p>

            </div>
        </div>
    );
}