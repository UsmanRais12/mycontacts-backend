const asyncHandler = require("express-async-handler")
const User  = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//@desc Register a User
//@ route /POST api/users
//@ access public
const registerUser = asyncHandler(async(req,res)=>{
    const {username , email , password} =req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailible = await User.findOne({email})
    if(userAvailible){
        res.status(400);
        throw new Error("User already registered.")
    }
    const hashedpassword  =await  bcrypt.hash(password,10)
    const user = await User.create({
        username,
        email,
        password:hashedpassword,
    })
    console.log(`User registered ${user}`);
    if(user){
        res.status(200).json({_id: user.id , email: user.email})
    }
    else{
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.json({message:'Register the user'})
})

//@desc Login User
//@ route /POST api/users
//@ access public
const loginUser = asyncHandler(async(req,res)=>{
    const { email, password } = req.body;
if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
}

const user = await User.findOne({ email });
if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
        {
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKENSECRET,
        { expiresIn: "15m" } // expiresIn should be placed here
    );
    res.status(200).json({ accessToken });
} else {
    res.status(401);
    throw new Error("Incorrect email or password");
}

})


//@desc check Current User
//@ route /GET api/users
//@ access public
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}