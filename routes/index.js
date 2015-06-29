var PlayerModel = require("../models/PlayerModel");

module.exports = function (app, store) {

    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/login", function (req, res) {
        res.render("login", { message: req.query.message });
    });

    app.post("/login", function (req, res) {
        var player = PlayerModel.findBy("email", req.body.email);

        if (req.body.password === player.password) {
            res.redirect("/");
        } else {
            res.redirect("/login?message=Invalid email and/or password.");
        }
    });

};
