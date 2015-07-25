var Player = require("../models/Player");

module.exports = function (app) {
    "use strict";

    // TODO make real REST API for backbone models
    app.get("/players/:id", function (req, res) {
        Player.forge({id: req.params.id}).fetch().then(function (player) {
            res.json(player);
        });
    });

    app.post("/players", function (req, res) {
        //var id = req.params.id || req.body.id;
        res.json({});
    });

};
