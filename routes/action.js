module.exports = function (app, wss, store) {

    var cookie = require("cookie"),
        util = require("util");

    wss.broadcast = function(event, data) {
        wss.clients.forEach(function(client) {
            client.send({event: event, data: data});
        });
    };

    wss.on("connection", function (clientSocket) {
        // TODO upgrade to a better cookie store
        var cookies = cookie.parse(clientSocket.upgradeReq.headers.cookie);
        store.get(cookies["connect.sid"].substr(2).split(".")[0], function (err, session) {
            if (err || !session) {
                return; // user doesn"t have a valid session
            }
            clientSocket.on("message", function(data) {

                data = JSON.parse(data);

                if (!data.event) {
                    return;
                }

                switch (data.event) {
                    case "auto_attack":
                        clientSocket.send(JSON.stringify({ event: "auto_attack", payload: {won: true, xp: 3} }));
                        break;
                    default:
                        break;
                }
                console.log("received: %s", data.payload);
            });
            //wss.broadcast("broadcast", "geez wit amen");
        });
    });

};
