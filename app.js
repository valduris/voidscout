var express = require("express"),
    app = express(),
    http = require('http').Server(app),
    session = require('express-session'),
    WebSocketServer = require('ws').Server,
    store = new session.MemoryStore(),
    wss = new WebSocketServer({ port: 8080 });

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use( session({ store: store, resave: false, secret: 'secret', saveUninitialized: true }) );
app.use( express.static('assets') );
app.use( function( err, req, res, next ) {
    res.send( err.stack );
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
    console.log("Listening on " + port);
    [ 'index', 'player' ].forEach( function ( file ) {
        require('./routes/' + file)(app);
    });

    // handle websocket requests
    require('./routes/action')(app, wss, store);
});
