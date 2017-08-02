var express =require('express');
var router=express.Router();
var mongojs=require('mongojs');
var db=mongojs('mongodb://Rajesh:Rajesh@ds125623.mlab.com:25623/meantodosapp',['todos']);

//Get All Todo
router.get('/todos',function(req,res,next){
db.todos.find(function(err,todos){
    if(err)
    {
        res.send(err);
    }
    else{
        res.json(todos);
    }
});
});

//Get Single Todo
router.get('/todos/:id',function(req,res,next){
db.todos.findOne({
    _id :mongojs.ObjectId(req.params.id)
},function(err,todos){
    if(err)
    {
        res.send(err);
    }
    else{
        res.json(todos);
    }
});
});


//Save Todo

router.post("/todo",function(req,res,next){
var todo=req.body;
if(!todo.text || ! (todo.isCompleted+''))
{
res.status(400);
res.json({"error":"Invalid Data"});

}
else{
db.todo.save(todo,function(err,todos){
    if(err)
    {
        res.send(err);
    }
    else{
        res.json(todos);
    }
});

}
});



//Update Todo

router.put("/todo/:id",function(req,res,next){
var todo=req.body;
var updObj={};

if(todo.isCompleted){
updObj.isCompleted=todo.isCompleted;
}

if(todo.isCompleted){
updObj.text=todo.text;
}

if(!updObj)
{
res.status(400);
res.json({"error":"Invalid Data"});

}
else{
db.todo.update({
    _id : mongojs.ObjectId(req.params.id)

},updObj,{},function(err,todos){
    if(err)
    {
        res.send(err);
    }
    else{
        res.json(todos);
    }
});


}
});

//Delete Todos

router.delete("/todo/:id",function(req,res,next){

db.todo.remove({
    _id : mongojs.ObjectId(req.params.id)

},'',function(err,todos){
    if(err)
    {
        res.send(err);
    }
    else{
        res.json(todos);
    }
});

});
module.exports=router;