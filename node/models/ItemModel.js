var EntityModel = require("./EntityModel");

module.exports = (function () {
    "use strict";

    var ItemModel = Object.create(EntityModel);

    ItemModel.initialize([
        { id: 1, "name": "", min_level: 1, xp: 3 },
        { id: 2, "name": "", min_level: 2, xp: 5 },
        { id: 3, "name": "", min_level: 3, xp: 9 },
        { id: 4, "name": "", min_level: 4, xp: 14 }
    ]);

    return ItemModel;

}());
