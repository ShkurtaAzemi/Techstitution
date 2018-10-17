const express= require('express');

//init instnce app
const app= express();

app.set('views', __dirname+ '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/public'));

const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//setup mongodb
const MongoClient=require('mongodb').MongoClient;
const mongoUrl='mongodb://localhost:27017/todolist';
const ObjectId=require('mongodb').ObjectId;

MongoClient.connect(mongoUrl, function(err, db){
    if(err){
        console.log(err);
        return;
    }
    console.log('Database successfully connected!');
    todos= db.collection('todos');
});

app.get('/', function(req,res){

    todos.find().toArray(function(err,docs){
        if(err){
            console.log(err);
            return;
        }
    res.render("index", {docs: docs});
    });
});

app.get('/todos/:id', function(req,res){
    todos.findOne({_id: ObjectId(req.params.id)}, function(err, doc){
        if(err){
            console.log(err);
            return;
        }
    
   res.render('show',{doc:doc}); 
    });
});
    
app.post('/todos/add', function(req,res){
    
    todos.insert(req.body, function(err, result){
        if(err){
         console.log(err);
            return;
        }
    
   res.redirect('/'); 
    });
});

    
    app.get('/todos/edit/:id', function(req, res) {
        todos.findOne({_id: ObjectId(req.params.id)}, function(err,doc){
            if(err){
                console.log(err);
                return;
            }
        
   res.render('edit',{doc:doc});
        });
});

app.post('/todos/update/:id', function(req, res) {
    
    todos.updateOne({_id: ObjectId(req.params.id)},
                   {$set: {numri:req.body.numri, lloji:req.body.lloji, aktiviteti:req.body.aktiviteti, date1:req.body.date1, date2:req.body.date2, date3:req.body.date3, date4:req.body.date4, date5:req.body.date5,  date6:req.body.date6, cmimi1:req.body.cmimi1, cmimi2:req.body.cmimi2, emri:req.body.emri }},
                   function(err,result){
        if(err){
            console.log(err);
            return;
        }
    
   res.redirect('/');
    });
});


app.get('/todos/delete/:id', function(req, res) {
    todos.deleteOne({_id:ObjectId(req.params.id)},function(err, result)
                   {
        if(err){
            console.log(err);
            return;
        }
    
   res.redirect('/');
    });
});

app.get('/add', (req, res) => {
    res.render('add');
   });


app.listen(3000, function(){
    
    console.log("App running at port 3000");
});