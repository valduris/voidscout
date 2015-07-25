var Bookshelf = require("./Bookshelf");

require("./MonstersItems");
require("./Item");

module.exports = (function () {
    "use strict";

    var Monster = Bookshelf.Model.extend({
        tableName: "monsters",
        idAttribute: ["monster_id"],
        items: function () {
            return this.belongsToMany("Item", "monsters_items", "monster_id", "item_id");
        },
        monsters_items: function () {
            return this.hasMany("MonstersItems", "monster_id");
        }
    });

    // TODO make MonsterItemModel; ORM?
    Monster.data = [
        { id:  1, level:  1, xp:  3, "name": "NPC_PLAGUED_RAT",    drops: [{id: 1, chance: 0.2}] },
        { id:  2, level:  2, xp:  5, "name": "NPC_RAT",            drops: [{id: 1, chance: 0.21}, {id: 2, chance: 0.45}] },
        { id:  3, level:  3, xp:  9, "name": "NPC_OVERSIZED_RAT",  drops: [{id: 2, chance: 0.55}] },
        { id:  4, level:  4, xp: 14, "name": "NPC_CRAZED_MONGREL", drops: [{id: 2, chance: 0.31}, {id: 4, chance: 0.24}] },
        { id:  5, level:  5, xp: 19, "name": "NPC_RAGING_MONGREL", drops: [{id: 2, chance: 0.34}, {id: 4, chance: 0.1}] },
        { id:  6, level:  6, xp: 23, "name": "NPC_WEAKENED_GNOLL", drops: [{id: 999, chance: 0.00001}] },
        { id:  7, level:  7, xp: 29, "name": "NPC_SKELETON",       drops: [{id: 999, chance: 0.00001}] },
        { id:  8, level:  8, xp: 35, "name": "NPC_WALKING_CORPSE", drops: [{id: 999, chance: 0.00001}] },
        { id:  9, level:  9, xp: 41, "name": "NPC_WOLF",           drops: [{id: 999, chance: 0.00001}] },
        { id: 10, level: 10, xp: 53, "name": "NPC_DIRE_WOLF",      drops: [{id: 999, chance: 0.00001}] },
        { id: 11, level: 11, xp: 67, "name": "NPC_MINE_SKELETON",  drops: [{id: 999, chance: 0.00001}] }
    ];

    return Bookshelf.model("Monster", Monster);

}());
