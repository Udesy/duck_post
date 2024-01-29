import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;

//Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//Data Center
let posts = [];

//Post Constructor
function Post(title,content){
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

//Add Post
function addPost(title, content){
    let post = new Post(title, content);
    posts.push(post);
}

//Delete Post
function deletePost(index){
    posts.splice(index, 1);
}

//Edit Post
function editPost(index, title, content){
    posts[index] = new Post(title, content);
}

//All Paths

//Save Post
app.post("/save", (req,res) =>{
    let title = req.body["title"];
    let content = req.body["content"];

    addPost(title,content);
    res.redirect("/")
})


// Home
app.get("/", (req, res) => {
    res.render("home.ejs", {posts : posts})
});

//View Post
app.get("/view/:id",(req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

//Create Post Page
app.get("/create", (req,res) =>{
    res.render("create.ejs")
});

//Edit Post 
app.get("/edit/:id", (req, res) =>{
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content})
});

//Update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

//Delete Post
app.post("/delete", (req, res) =>{
    let index = req.body["postId"]
    deletePost(index);
    res.redirect("/");
});

//Port listen
app.listen(port, () =>{
    addPost("What you wanted to be Growing Up I wanted to be an F1 driver.", "What do a normal kid will be dreaming of to be when he will grow up? A Pilot, A Doctor,A Chef Right I wanted to be a F1 driver sounds crazy  ut thats who I wanted to be just because of the cool cars they drive and the speed is fascinating enough to make 10 year old a fanof F1. Tell your stories who you wanted to be growing up and Why.")
    console.log(`Server running on port ${port}`);
});
