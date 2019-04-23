fs = require('fs');
http = require('http');
url = require('url');
var index = fs.readFileSync('index.html');

http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var action = request.pathname;

  if (action == '/img.jpg') {
     var img = fs.readFileSync('./img.jpg');
     res.writeHead(200, {'Content-Type': 'image/jpg' });
     res.end(img, 'binary');
  } else if (action == '/002.jpg') {
     var img = fs.readFileSync('./002.jpg');
     res.writeHead(200, {'Content-Type': 'image/jpg' });
     res.end(img, 'binary');
  } else if ( req.method == 'POST') {
       var body = ''; 
       console.log("POST");
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        req.on('end', function () {
            console.log("End body: " + body);
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('post received');
//save to file
var fs = require('fs');
var stream = fs.createWriteStream("my_file.txt", 'a');
stream.once('open', function(fd) {
  stream.write("Server first row\r\n");
  stream.write("Server second row\r\n");
  stream.write(body);
  stream.end();
});

  } else { 
     res.writeHead(200, {'Content-Type': 'text/html' });
     res.end(index);
     //res.end('Hello World \n');
  }
}).listen(3000, '127.0.0.1');