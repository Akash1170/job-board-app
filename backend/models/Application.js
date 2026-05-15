const mongoose = require("mongoose");

const applicationSchema =
new mongoose.Schema({

candidate:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

job:{
type:mongoose.Schema.Types.ObjectId,
ref:"Job"
},

status:{
type:String,

default:"Applied"
}

},{timestamps:true});

module.exports =
mongoose.model(
"Application",
applicationSchema
);