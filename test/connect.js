import connect from 'connect';
import http from 'http';
import Badgs from './../src';
import badgesMiddleware from './../src/middleware';

const app = connect();

// respond to all requests
app.use('/badges', badgesMiddleware(new Badgs()));

// create node.js http server and listen on port
http.createServer(app).listen(3000);
