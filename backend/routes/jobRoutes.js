const express =
require("express");

const Job =
require("../models/Job");

const router =
express.Router();



// Create Job

router.post(
"/create",

async(req,res)=>{

const job =
await Job.create(
req.body
);

res.json(job);

});




// Get Jobs + Search

router.get(

"/",

async(req,res)=>{

let query = {};

if(req.query.location){

query.location =
req.query.location;

}

if(req.query.title){

query.title =
req.query.title;

}

const jobs =
await Job.find(query);

res.json(jobs);

}

);




// Update Job

router.put(

"/update/:id",

async(req,res)=>{

const job =
await Job.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);

res.json(job);

});




// Close Job

router.put(

"/close/:id",

async(req,res)=>{

const job =
await Job.findByIdAndUpdate(

req.params.id,

{
status:"Closed"
},

{
new:true
}

);

res.json(job);

});



module.exports =
router;