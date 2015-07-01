var PlayerModel = require("../models/PlayerModel");

module.exports = function (app) {
    "use strict";

    // TODO make real REST API for backbone models
    app.get("/players/:id", function (req, res) {
        res.json(PlayerModel.findBy("id", req.params.id));
    });

    app.post("/players", function (req, res) {
        //var id = req.params.id || req.body.id;
        res.json({});
    });

};
