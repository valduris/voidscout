/*global define*/
define(function (require) {
    "use strict";
    var IndexView = require("views/IndexView"),
        PlayerModel = require("models/PlayerModel"),
        ExperienceBarView = require("views/ExperienceBarView"),
        InventoryItemsView = require("views/InventoryItemsView"),
        WornItemsView = require("views/WornItemsView"),
        Backbone = require("backbone"),
        $ = require("jquery");

    return Backbone.Model.extend({
        initialize: function () {
            $.get("/players/1",  function (playerData) {
                var player = new PlayerModel(playerData),
                    indexView = new IndexView({
                        model: player
                    }),
                    experienceBarView = new ExperienceBarView({
                        model: player
                    }),
                    inventoryItemsView = new InventoryItemsView({
                        model: player
                    }),
                    wornItemsView = new WornItemsView({
                        model: player
                    });
            });
        }
    });
});
