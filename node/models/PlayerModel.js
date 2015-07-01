var EntityModel = require("./EntityModel");

// TODO make real database
module.exports = (function () {
    "use strict";

    var PlayerModel = Object.create(EntityModel);

    PlayerModel.initialize([
        {id: 1, "name": "Dukslis Kondrārs", "email": "dukslis@evolutiongaming.com", char_name: "dukslis", password: "123", level: 2},
        {id: 2, "name": "Iļja Kronovs", "email": "Iļja.Kronovs@gmail.com", char_name: "ilya", password: "234", level: 3}
    ]);

    return PlayerModel;

}());
