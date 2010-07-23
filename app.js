
/**
 * Module dependencies.
 */

var express = require('express'),
    connect = require('connect');

// Create and export Express app

var app = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.use('/', connect.bodyDecoder());
    app.use('/', connect.methodOverride());
    app.use('/', connect.compiler({ src: __dirname + '/public', enable: ['sass'] }));
    app.use('/', connect.staticProvider(__dirname + '/public'));
    app.use(connect.logger());
});

app.configure('development', function(){
    app.set('reload views', 1000);
    app.use('/', connect.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
   app.use('/', connect.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    res.render('index.jade', {
        locals: {
            title: 'node-console'
        }
    });
});

app.get('/ls', function(req, res){
  var stack = [];
  for (key in global)
    stack.push(key);
  res.send(JSON.stringify(stack));
});

app.get('/eval', function(req, res){

  res.send("blah");
  return;
  var cmd = req.params("cmd");
  var response = eval(cmd);
  res.send(response);
});

/*
app.get('/blah', function(req, res){res.send("blah blah"); });
*/

app.listen(3000);
