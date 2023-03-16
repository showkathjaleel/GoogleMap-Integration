import axios from "axios";

export  const authUser = async (email,password) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/auth/login`,
        {
          email:email,
          password:password,
        },
        {
          withCredentials: true,
        }
      )
      console.log(data)
       return data;
    } catch (err) {
      console.log(err);
    }
  };


  export const registerUser= async(username,email,password,phone)=>{
    console.log(username,email,password,phone);
   const {data}=await axios.post(`http://localhost:5000/auth/register`, {    
    username:username,
    email:email,
    password:password,
    phone:phone

   }, {
      withCredentials: true,
    })
    return data;
  }