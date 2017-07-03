var express = require('express');
var app = express();

// controllers
var agendaController = require('./controllers/c_agenda.js');
var noteController = require('./controllers/c_note.js');
var userController = require('./controllers/c_user.js');

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// set the port
app.set('port', (process.env.PORT || 5000));

// set the static files
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// routes
app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/test', function(request, response) {
    response.render('pages/test');
});

app.post('/createUser', userController.createUser)
app.post('/login', userController.login)

app.get('/createNote', noteController.createNote)
app.get('/getNotes', noteController.getNotes)
app.get('/updateNote', noteController.updateNote)

app.get('/addAgendaItem', agendaController.addAgendaItem)
app.get('/getAgendaItems', agendaController.getAgendaItems)


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
