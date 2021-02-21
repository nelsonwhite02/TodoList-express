const express = require("express");
const bodyParser = require("body-parser");
const { static } = require("express");
const date = require(__dirname+ "/date.js");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


let lists=[];

let workitems=[];

app.get("/", function(req, res){
 
    let day= date();

    res.render("list",{listTitle:day,newListItems:lists});
    
});

app.post("/", function(req,res){
    let list=req.body.todoItem;
    if(req.body.list==="work"){
        workitems.push(list);
        res.redirect("/work");
    }else{
        lists.push(list);
        res.redirect("/")
    }

  
   
})

app.get("/work", function(req,res){
    res.render("list", {listTitle:"work list", newListItems:workitems});
});

app.post("/work",function(req, res){
    let item = req.body.todoItem;
    workitems.push(item);
    res.redirect("/work");
})






app.listen(3000, function(){
    console.log("App is listening on Port 3000")
});