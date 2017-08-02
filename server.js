var express=require('express');
var path =require('path');
var bodyParser=require('body-parser');

var index=require('./route/index');
var todos=require('./route/todos');

var app=express();

//view Engine 
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use('/',index);
app.use('/api/v1/',todos);

app.listen(300,function(){
    console.log("Server strated on 3000");
});