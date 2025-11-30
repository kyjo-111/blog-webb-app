import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home.ejs", { success: req.query.success });
});

app.get("/create", (req, res) => {
   res.render("create.ejs"); n    
});

app.get("/view", (req, res) => {
    res.render("view.ejs", { posts: posts});
});

app.post("/submit", (req, res) => {
  const newPost = {
    id: posts.length,
    title: req.body["title"], 
    content: req.body["content"],
    date: new Date().toLocaleDateString()
  };

  posts.push(newPost);
  res.redirect("/?success=published");
});

app.post("/delete", (req, res) => {
  const indexToDelete = req.body.postIndex;
  posts.splice(indexToDelete, 1);
  res.redirect("/view");
});

app.get("/edit/:id", (req, res) => {
  const index = req.params.id;
  const postToEdit = posts[index];

  if (!postToEdit) {
    return res.status(404).send("Post not found! Maybe it was deleted?");
  }

  res.render("edit.ejs", { 
    post: postToEdit, 
    index: index 
  });
});

app.post("/edit/submit", (req, res) => {
  const index = req.body.postIndex;

  posts[index] = {
    id: index,
    title: req.body.title,
    content: req.body.content,
    date: posts[index].date
  };

  res.redirect("/view");
});

app.get("/post/:id", (req, res) => {
    const index = req.params.id;
    const post = posts[index];

    if (!post) {
      return res.status(404).send("Post not found!");
    }

    res.render("post.ejs", {
      post: post,
      index: index,
    });
});

app.listen(port, () => {
    console.log(`Up in port: ${port}`);
});