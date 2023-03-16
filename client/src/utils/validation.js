export const validateLogin=(password,email) =>{
    const error = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      error.email = "Email Required!";
    } else if (!regex.test(email)) {
      error.email = "Enter a Valid Email";
    }

    if (!password) {
      error.password = "Password is Required!";
    } else if (password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (password.length > 12) {
      error.password = "Password cannot exceed more than 12 characters";
    }

    return error;
  }



  export const validateSignup=(username,email,password,confirmpassword,phone)=> {
    const error = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const usernameRegex = /^[a-zA-Z0-9]$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!username) {
      error.username = "Username is Required";
    }
    // else if(!usernameRegex.test(data.username)){
    //   error.username=" Username can contain only alphanumeric characters"
    // }

    if (!email) {
      error.email = "Email Required!";
    } else if (!regex.test(email)) {
      error.email = "Enter a Valid Email";
    }

    if (!password) {
      error.password = "Password is Required!";
    } else if (password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (password.length > 12) {
      error.password = "Password cannot exceed more than 12 characters";
    }

    if (!confirmpassword) {
      error.confirmpassword = "ConfirmPassword is Required!";
    } else if (password !== confirmpassword) {
      error.confirmpassword = "Passwords do not match";
    }
    if (!phone) {
      error.phone = "Phone Number is Required!";
    } else if (!phoneRegex.test(phone)) {
      error.phone = "Enter a Valid Phone Number";
    }

    return error;
  }