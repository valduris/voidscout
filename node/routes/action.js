var MonsterModel = require("../models/MonsterModel"),
    ItemModel = require("../models/ItemModel");

module.exports = function (app, wss, store) {
    "use strict";
    var cookie = require("cookie");

    wss.broadcast = function (event, data) {
        wss.clients.forEach(function (client) {
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
            clientSocket.on("message", function (data) {

                data = JSON.parse(data);

                if (!data.event) {
                    return;
                }

                switch (data.event) {
                case "auto_attack":
                    var monster = MonsterModel.find(data.payload.target),
                        items = [],
                        i;

                    for (i = monster.drops.length - 1; i >= 0; i--) {
                        if (monster.drops[i].chance > Math.random()) {
                            items.push(ItemModel.find(monster.drops[i].id));
                        }
                    }

                    clientSocket.send(JSON.stringify({ event: "auto_attack", payload: {won: true, xp: 10, items: items} }));
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
