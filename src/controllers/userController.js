const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    createUser : async(req, res) => {
        try {
            const {name, email, password} = req.body

            if(!name || !email || !password) {
                res.status(400).json({
                   message: "Required fields cannot be empty"
                })
            }

            let existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            
            const newUSer = new User({ name, email, password })

            await newUSer.save()
            
            const token = jwt.sign({email}, process.env.TOKEN_SECRET_KEY)
            
            res.cookie('token', token)

            res.status(201).json({
                message: "User created",
                User
            })

        } catch(err) {
            console.log(err);
            
            res.status(500).json({
                message: "Internal server error"
            })
        }
    },

    getUsers : async(req, res) => {
        try {
            const users = await User.find()

            res.status(200).json({
                message: "Successfully fetched users",
                status: true,
                users
            })
        } catch {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    },
    
    updateUserByID: async(req, res) => {
        const {id} = req.params

        if(!id) {
            res.status(400).json({
                message: "User Id required"
            })
        }

        const {token} = req.cookies
        
        if(!token) res.status(400).json({
            message: "token not available"
        })

        const authenticateUSer = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

        if(!authenticateUSer) {
            res.status(401).json({
                message: "Not authenticated"
            })
        }

        const userData = await User.findByIdAndUpdate(
            id,
            {name, email, password},
            {new: true},
        )

        return res.status(200).json({
            userData,
            success:true
        })
    }
}
