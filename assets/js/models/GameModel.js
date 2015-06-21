/*global define*/
define(function (require) {
    "use strict";
    var IndexView = require("views/IndexView"),
        PlayerModel = require("models/PlayerModel"),
        PlayerView = require("views/PlayerView"),
        Backbone = require("backbone"),
        $ = require("jquery");

    return Backbone.Model.extend({
        initialize: function () {
            $.get("/players/1",  function (playerData) {
                var player = new PlayerModel(playerData),
                    indexView = new IndexView({
                        model: player
                    }),
                    playerView = new PlayerView({
                        model: player
                    });
            });
        }
    })
});
