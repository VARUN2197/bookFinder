const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static('public')); 
const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.render('home.handlebars');
});

app.listen(port, () => {
    console.log("Server is runnning")
});