const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// function rqListener(req, res) {

// }

const app = express()
const dbURI = 'mongodb+srv://mikececco2000:test123@cluster0.uvbrsfv.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000)) //listen to the port after connection with DB is established
  .catch((err) => console.log(err))

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); //to accept form data

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about',
    body: 'more'
  });

  blog.save()
    .then((result) => {
      res.render('create', {title: 'All Blogs', blogs: result} )
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.render('index', {title: 'All Blogs', blogs: result} )
    })
    .catch((err) => {
      console.log(err);
    })
})

app.post('/all-blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
  .then((result) => {
    res.redirect('/all-blogs');
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get('/all-blogs/:id', (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.render('show', {blog: result, title: "Blog details"} )
    })
    .catch((err) => {
      console.log(err);
    })
})

app.delete('/all-blogs/:id', (req, res) => {
  const { id } = req.params;
  
})

app.get('/', (req, res, next) => {
  res.redirect('/all-blogs');
});
