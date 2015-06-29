var EntityModel = require("./EntityModel");

module.exports = (function () {
    "use strict";

    var MonsterModel = Object.create(EntityModel);

    MonsterModel.initialize([
        { id: 1, "name": "NPC_PLAGUED_RAT", level: 1, xp: 3 },
        { id: 2, "name": "NPC_RAT", level: 2, xp: 5 },
        { id: 3, "name": "NPC_OVERSIZED_RAT", level: 3, xp: 9 },
        { id: 4, "name": "NPC_CRAZED_MONGREL", level: 4, xp: 14 }
    ]);

    return MonsterModel;

}());
