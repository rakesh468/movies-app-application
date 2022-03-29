const Users=require("../models/userModel");

const authAdmin=async (request,response,next)=>{
    try {
        const user = await Users.findOne({
            _id: request.user.id,
          });
          if (user.role === 0)
            return response
              .status(400)
              .json({ msg: "Admin resource access denaied" });
          next();
        
    } catch (error) {
        return response.status(500).send({msg:error.message})
        
    }
}

module.exports=authAdmin;