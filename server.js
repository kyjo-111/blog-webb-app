import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const posts = []; //the database where i put the blog creation of the user


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home.ejs");

});

app.get("/create", (req, res) => {
   res.render("create.ejs");

});


app.get("/view", (req, res) => {
    res.render("view.ejs", { posts: posts});
});

app.post("/submit", (req, res) => {
  // 1. Create a new post object
  // using the "name" attributes from the form (title, content)
  const newPost = {
    id: posts.length, // Give it a unique ID (0, 1, 2...)
    title: req.body["title"], 
    content: req.body["content"],
    date: new Date().toLocaleDateString() // Bonus: Add the date!
  };

  // 2. Save it to our array
  posts.push(newPost);

  // 3. Go back home to see the result
  res.redirect("/");
});



app.post("/delete", (req, res) => {
  // 1. Get the index of the post to delete
  const indexToDelete = req.body.postIndex;

  // 2. Remove it from the 'posts' array
  // .splice(index, 1) means "Go to index, and remove 1 item"
  posts.splice(indexToDelete, 1);

  // 3. Refresh the View page to show it's gone
  res.redirect("/view");
});

// Step A: Show the Edit Form
app.get("/edit/:id", (req, res) => {
  const index = req.params.id; // Get the ID from the URL (e.g., 0)
  const postToEdit = posts[index]; // Find the post in the array

  // Render the edit page, passing the specific post and its index
  res.render("edit.ejs", { 
    post: postToEdit, 
    index: index 
  });
});

app.listen(port, () => {
    console.log(`Up in port: ${port}`);
    
})    