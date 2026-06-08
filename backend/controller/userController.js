const userSchema = require("../model/userModel");

exports.userRegister =  async (req, res) =>{
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            return res  
                .status(400)
                .json({success: false, message : "All fields are mandatory"});
        }
        await userSchema.create({ username, password })
        return res  
            .status(201)
            .json({success: true, message: "User register successfully"})
    } catch (error) {
        return res
            .status(500)
            .json({success: false, message: error.message})
    }
}

exports.loginUser = async (req, res) =>{
    try {
        const{username, password} = req.body;
        if(!username || !password){
            return res
                .status(400)
                .json({success: false, message: "All fields are required"})
        }
        let user = await userSchema.findOne({ username})
        if(!user){
            return res
                .status(404)
                .json({success: false, message: "User not found"})
        }else{
            let isMatch = await user.comparePassword(password)
            console.log(isMatch);
            if(isMatch){
                let token = await user.generateToken();
                return res.status(200).json({success:true, message: "login success", token}) 
            }else{
                return res
                    .status(404)
                    .json({success: false, message: "invalid Password"})
            }
        }
    } catch (error) {
        return res
            .status(500)
            .json({success: false, message: error.message})
    }
};