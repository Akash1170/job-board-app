const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User =
require("../models/User");

const router =
express.Router();



// Multer Setup

const storage =
multer.diskStorage({

destination:
"uploads/",

filename:
(req,file,cb)=>{

cb(
null,

Date.now()
+
"-"
+
file.originalname

);

}

});

const upload =
multer({
storage
});




// Register

router.post(

"/register",

async(req,res)=>{

try{

const {
name,
email,
password,
role
} = req.body;


const hashed =
await bcrypt.hash(
password,
10
);


const user =
await User.create({

name,
email,

password:
hashed,

role

});

res.json(user);

}

catch(err){

res.status(500)
.json({

message:
err.message

});

}

}

);




// Login

router.post(

"/login",

async(req,res)=>{

const {
email,
password
}
=
req.body;


const user =
await User.findOne({
email
});


if(!user){

return res.json({

message:
"User not found"

});

}


const match =
await bcrypt.compare(

password,

user.password

);


if(!match){

return res.json({

message:
"Wrong password"

});

}


const token =
jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET

);


res.json({

token,
user

});

});




// Resume Upload

router.post(

"/upload/:id",

upload.single(
"resume"
),

async(req,res)=>{

try{

const user =
await User.findByIdAndUpdate(

req.params.id,

{

resume:
req.file.path

},

{
new:true
}

);

res.json(user);

}

catch(err){

res.status(500)
.json({

message:
err.message

});

}

}

);



module.exports =
router;