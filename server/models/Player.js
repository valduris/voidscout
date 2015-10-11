var Bookshelf = require("./Bookshelf");

module.exports = (function () {
    "use strict";

    var Player = Bookshelf.Model.extend({
        tableName: "players"
    });

    return Player;

}());
