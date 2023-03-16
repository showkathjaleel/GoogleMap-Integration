import User from "../models/User.js";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()
console.log(process.env.REFRESH_TOKEN_SECRET,"OKEN_SECRET");


function generateAccessToken(user) {
  try { 
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "25s",
    });
  } catch (error) {
     console.log(error)
  }
}

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};
let refreshTokens = [];


export const userRegister = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    // res.json({ bool: true, message: "User Already exists" });
    return next(createError(404, "User not found"));
  }

  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
    });
    // save user and respond
    const user = newUser.save();
    res.status(200).json({ user, bool: false });
  } catch (err) {
    // console.log(err);
    // res.status(500).json(err);
    next(err);
  }
};

export const userLogin = async (req, res, next) => {
 
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return next(createError(404, "User not found"));
      // return res.json({ bool: true, message: 'user not found' })
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if password is not valid
    if (!validPassword) {
      return next(createError(400, "Wrong password"));
      // return res.json({ bool: true, message: 'wrong password' })
    }

    const {createdAt,updatedAt,...others} = user
    // //Authenticate user
    const accessToken = generateAccessToken(others);
    const refreshToken = generateRefreshToken(others)
    // jwt.sign(others, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });

  } catch (err) {
    next(err);
  }
};




 export const refresh = async (req, res) => {
  console.log('refreshil keri');
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
}
