// Create web server
// Load the express module
var express = require('express');
// Create app object
var app = express();
// Load the body-parser module
var bodyParser = require('body-parser');

// Load the comments module
var comments = require('./comments');

// Parse the application/json
app.use(bodyParser.json());

// Set the port
app.set('port', process.env.PORT || 3000);

// Set the route for the root URL
app.get('/', function(req, res) {
    res.send('Welcome to the comments server');
});

// Set the route for the comments URL
app.get('/comments', function(req, res) {
    res.json(comments.getComments());
});

// Set the route for the comments URL
app.get('/comments/:id', function(req, res) {
    var comment = comments.getComment(req.params.id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({error: 'Comment not found'});
    }
});

// Set the route for the comments URL
app.post('/comments', function(req, res) {
    var comment = req.body;
    comments.addComment(comment);
    res.status(201).json(comment);
});

// Set the route for the comments URL
app.put('/comments/:id', function(req, res) {
    if (comments.getComment(req.params.id)) {
        comments.updateComment(req.params.id, req.body);
        res.status(200).json({message: 'Comment updated'});
    } else {
        res.status(404).json({error: 'Comment not found'});
    }
});

// Set the route for the comments URL
app.delete('/comments/:id', function(req, res) {
    if (comments.getComment(req.params.id)) {
        comments.deleteComment(req.params.id);
        res.status(200).json({message: 'Comment deleted'});
    } else {
        res.status(404).json({error: 'Comment not found'});
    }
});

// Start the server
app.listen(app.get('port'), function() {
    console.log('Server started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});