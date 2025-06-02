const ROLES = require("../config/constant")
const User = require("../Models/User")

const checkRole = (roles = [ROLES.ADMIN])=>{
    return async (req,res,next) => {
        try {
          
            const userId = req.user._id
            const user  = await User.findById(userId)

            if(!user){
                return res.status(404).json({message:"User Not found"})
            }
            userRole = user.permission
            if(!roles.includes(userRole)){
                return res.status(403).json({message:"Access denied"})
            }
            next()
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
}

module.exports = checkRole