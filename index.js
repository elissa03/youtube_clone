
const express = require("express"); //require express module

const mongoose = require('mongoose');  //require mongoose
const videos = require('./videos');
const users = require("./users");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://admin:2Fnr6rvjtRv6qXFc@videos.zlvugpi.mongodb.net/?retryWrites=true&w=majority').then(console.log("connected"));

const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"style"))) //link style directory
app.use(express.static(path.join(__dirname,"images"))) //link images directory


app.set("view engine", "ejs"); //setting EJS as the Express app view engine
app.set("views", path.join(__dirname, "views")) //link views directory

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

//session
app.use(session({
    secret: 'elissa',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//render home page
app.get('/', async(req, res)=>{
    const entries = await videos.find({});
    console.log(entries)
    res.render('home', {videos: entries})
})

//render upload form
app.get('/upload', (req,res)=>{
    res.render('form')
})

//go back to home page from upload form
app.get('/home', (req, res)=>{
    res.redirect('/')
})

app.get('/signup', (req, res)=>{
    res.render('signup')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.get('/forget', (req, res)=>{
    res.render('forgot')
})
//upload button in form
app.post('/onSubmit', async(req, res)=>{
    await videos.create({
        title: req.body.title,
        description: req.body.description,
        videoPath: req.body.vidfile,
        thumbnail: req.body.thumbfile
    })
    res.redirect('/')
})

var idToDisplay;
app.get('/view/:_id', (req, res) =>{
    //save id in parameter
    idToDisplay = req.params._id.slice(1, req.params._id.length);
    res.redirect('/display') 
})

app.get('/display', async (req, res) => {
    //find the video by id and store it in entry
    const entry = await videos.findById(idToDisplay)
    console.log(entry)
    //render display and send object that contains the video to display
    res.render('display', {entry: entry}) 
})



app.listen(4000);