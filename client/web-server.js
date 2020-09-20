const express = require("express");
const fs = require("fs").promises;

const app = express();

let url = 'http://127.0.0.1';

let port = 80;

let path = './www';
 
app.use(express.static(path));
 
app.get('/', function(request, response) {
     
    fs.readFile(path + '/index.html', 'utf8')
        .then(contents => {
            response.setHeader('Content-Type', 'text/html');
            response.writeHead(200);
            response.end(contents);
        })
        .catch(error => {
            response.writeHead(500);
            response.end(error);
            return;
        });
});

app.get('/user', function(request, response) {
     
    fs.readFile(path + '/user.html', 'utf8')
        .then(contents => {
            response.setHeader('Content-Type', 'text/html');
            response.writeHead(200);
            response.end(contents);
        })
        .catch(error => {
            response.writeHead(500);
            response.end(error);
            return;
        });
});

let userCounter = 0;

app.post('/api/get/user', function(request, response) {

    console.log('/api/get/user');

    const model = {
        id: ++userCounter,
        login: 'player',
        name: null,
        icon: null
    }

    const data = JSON.stringify(model);

    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    response.end(data);
});
 
app.listen(80);

console.log(`Application is running: ${url}:${port}`);