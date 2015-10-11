var Bookshelf = require("./Bookshelf");

require("./Item");
require("./Monster");

module.exports = (function () {
    "use strict";

    var MonstersItems = Bookshelf.Model.extend({
        tableName: "monsters_items",
        idAttribute: ["id"],
        monster: function () {
            return this.belongsTo("Monster", "monster_id");
        },
        item: function () {
            return this.belongsTo("Item", "item_id");
        }
    });

    return Bookshelf.model("MonstersItems", MonstersItems);

}());
