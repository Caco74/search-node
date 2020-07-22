const http = require('http')
const bodyParser = require('body-parser')
const express = require('express')
const routes = require('./routes')

const port = process.env.PORT ||  3000
const app = express()
const server = http.createServer(app)

routes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

server.listen(port, () => {
    console.log(`Listening on port ${port}`);    
})