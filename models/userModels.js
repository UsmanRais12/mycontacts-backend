const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:[true,'Please add the username']
    },
    email:{
        type:String,
        require:[true,'Please provide email address'],
        unique:[true,'Email address already exist.']
    },
    password:{
        type:String,
        require:[true,"Please add user password"]
    }
},{
    timestamps: true,
})
module.exports = mongoose.model("User",userSchema)