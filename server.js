// import modules
const knex = require('./db/knex');
const express = require('express');
const bodyParser = require('body-parser');

// create express instance
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

// routing
// GET all posts
app.get('/', (req, res) => {
    knex.select().from('posts')
        .then( posts => {
            res.send(posts);
        })
        .catch( err => {
            console.error(err);
        })
});
// GET posts by author
app.get('/posts/:author', (req, res) => {
    knex.select().from('posts').where('author', req.params.author)
        .then( posts => {
            res.send(posts);
        })
        .catch( err => {
            console.error(err);
        })
});
// Create new post by Author
app.post('/posts/:author', (req, res) => {
    knex('posts').insert({
        author: req.params.author,
        content: req.body.content
    })
    .then((result) => {
        return res.json('User created successfully');
    })
    .catch(err => {
        console.error(err);
    })
});
// Update post by id
app.put('/update/:id', (req, res) => {
    knex('posts').where('id', req.params.id).update({
        content : req.body.content,
        author: req.body.author
    })
    .then( result => {
        return res.json('User updated content successfully');
    })
});
// Upvote post by id
app.put('/upvote/:id', (req, res) => {

});
// Delete post by id
app.delete('/remove/:id', (req, res) => {
    knex('posts').where('id', req.params.id).del()
    .then( result => {
        res.json('User Deleted Successfully');
    })
    .catch( err => {
        console.error(err);
    })
});
// handle requests to an incorrect route
app.use('/', (req, res) => {
    res.status(404).send('Route not found');
});

// Start server listening
app.listen(port, function(err) {
    if (err) {
        return console.log('Server did not start successfully', err);
    }
    console.log('Server listening on', port);
})