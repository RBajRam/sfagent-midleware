var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.port || 5000;
var ssId= '1234';
var app = express();

app.set('port', (process.env.PORT || 5000));

var apiai = require('apiai');
var apiapp = apiai("5e856e5b547941b198baab1ce85f50c8");

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.send('Hello world!!');
});

app.post('/chat', function(req, res){
  console.log(req.body.chatText);
  //ssId= req.body.sessionId;
  var request = apiapp.textRequest(req.body.chatText, {
    sessionId: ssId
  });
  request.on('response', function(response) {
      console.log(response);
      res.send(response);
  });
  request.on('error', function(error) {
      console.log(error);
      res.send(error);
  });
  request.end();
});

app.listen(app.get('port'), function(){
  console.log('server started on Port ', app.get('port'));
});

