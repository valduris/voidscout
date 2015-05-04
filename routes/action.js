module.exports = function( app, wss, store ) {

    var cookie = require('cookie');
    var cookieParser = require("cookie-parser")

    wss.broadcast = function( data ) {
        wss.clients.forEach( function( client ) {
            client.send( data );
        });
    };

    wss.on( 'connection', function(ws) {
        // TODO upgrade to a better cookie store
        var cookies = cookie.parse(ws.upgradeReq.headers.cookie);
        // console.log('cookies', cookies, typeof cookies);
        store.get(cookies['connect.sid'].substr(2).split('.')[0], function(err, session) {
            if( err || !session ) {
                return; // user doesn't have a valid session
            }
            ws.on( 'message', function( message ) {
                message = JSON.parse(message);

                if( !message.type ) {
                    return;
                }

                switch (message.type) {
                    case 'auto':

                        break;
                    default:
                        break;
                }
                console.log('received: %s', message);
            });
            wss.broadcast('geez wit amen');
        });
    });

};
