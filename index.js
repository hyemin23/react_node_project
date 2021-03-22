const express = require('express');
const app = express();
const port =5000;

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://hyemin:a4848684@reactnodeproject.cg6ah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>{
    console.log("MogoDB Connected..");
}).catch((err)=> console.log(err));

app.get('/',(req,res) => res.send('Hello World ~ '));
app.listen(port, () =>console.log(`example app liste on port ${port}!`))
