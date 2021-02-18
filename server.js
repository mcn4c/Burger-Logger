const express = require('express');
// Import routes and give the server access to them.
const routes = require('./controllers/burgers_controller');
// Set Handlebars.
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 8080;

const app = express();

// makes any file in this folder is accessible
app.use(express.static('public'));

//look over url to see if can parse an object
app.use(express.urlencoded({ extended: true }));
//if it is an object, i'm gonna turn it into JSON (2nd app.use)
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//makes it so frontend and backend always have to pass through routes
app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
