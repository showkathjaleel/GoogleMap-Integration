import express from "express"


import {userLogin, userRegister ,refresh } from "../controllers/authController.js"


const router=express.Router()

 router.post('/register', userRegister)

 router.post('/login', userLogin)

 router.post('/refresh', refresh)

export default router