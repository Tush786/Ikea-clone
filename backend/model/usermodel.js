const mongoose = require("mongoose");



const userSchema = mongoose.Schema({
    fullName : {type : String,required : true},
    phonenumber : {type : Number,required : true},
    email : {type : String,required : true},
    avatar: {type : String,required :false,default:"https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"},
    password: {type : String,required : false},
    resetToken:{type:String,required:false},
    coin: {type: Number,required: false, default: 100},
    referalCode: {type: String, required: false},
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}