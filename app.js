// imports 
const User=require('./model/contactschema');
const mongoose=require('mongoose');
const express=require('express');
const app=express();
// app.listen(9000,()=>console.log('successfully connected'))



// static files 

app.use(express.static('style'));


// db connectivity
const dburl='mongodb+srv://imran203:Imran786@nodefirstproject.a6czv88.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>app.listen(9000,()=>console.log('successfully connected')))
.catch((err)=>console.log('no connection'));


// set view engine
app.set('view engine','ejs');


// middleware 
app.use(express.urlencoded({extended:true}));

// home page 
app.get('/',(req,res)=>{
    res.render('form')

})

app.get('/form',(req,res)=>{
    res.redirect('/')
})

// sending the message to database 

app.post('/',(req,res)=>{
    const user=new User(req.body);
    user.save()
    .then(result=>res.render('success'))
    .catch(err=>res.status(404).render('error'))
});

// displaying data on client side
app.get('/data',(req,res)=>{
    User.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
});

    // displaying particular data 
    app.get('/:id',(req,res)=>{
        console.log(req.params.id);
        User.findById(req.params.id)
        .then(result=>{
            res.status(200).json({
                student:result
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
    })



// error page 
app.use((req,res)=>{
    res.status(404).render('error')
})





