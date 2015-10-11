var Player = require("../models/Player"),
    consts = require("../consts");

module.exports = function (app) {
    "use strict";
    // TODO make real REST API for backbone models
    app.get("/players/:id", function (req, res) {
        Player.forge({id: req.params.id}).fetch().then(function (player) {
            player.set("wornItems", [
                {type: consts.itemTypes.SWORD, min_equip_level: 1, bonus: {armor: 2}, name: "test item", level: 12}
            ]);
            res.json(player);
        });
    });

    app.post("/players", function (req, res) {
        //var id = req.params.id || req.body.id;
        res.json({});
    });

};
