const express = require("express");
const fs = require("fs").promises;

const app = express();

let url = 'http://127.0.0.1';

let port = 80;

let path = './www';
 
app.use(express.static(path));
 
app.use('/', function(request, response){
     
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
 
app.listen(80);

console.log(`Application is running: ${url}:${port}`);