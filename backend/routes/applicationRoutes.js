const express =
require("express");

const Application =
require("../models/Application");

const router =
express.Router();


// Apply Job

router.post(
"/apply",

async(req,res)=>{

try{

const app =
await Application.create(
req.body
);

res.json(app);

}

catch(err){

res.status(500).json({
message:err.message
});

}

});




// Get Applications

router.get(

"/",

async(req,res)=>{

const data =
await Application.find()

.populate("job")

.populate("candidate");

res.json(data);

}

);




// Update Status

router.put(

"/status/:id",

async(req,res)=>{

try{

const app =
await Application.findByIdAndUpdate(

req.params.id,

{
status:
req.body.status
},

{
new:true
}

);

res.json(app);

}

catch(err){

res.status(500).json({
message:
err.message
});

}

}

);



module.exports =
router;