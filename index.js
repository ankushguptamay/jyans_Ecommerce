const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const user = require('./Route/userRoute')

const db = require('./Model');
db.sequelize.sync().then(() => {
    // console.log('Database is synced');
}).catch((err) => {
    // console.log(err);
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());


app.use(express.static(__dirname + "/public"));

app.use('/api/user', user);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send('Hello World!');
});

PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});