var EntityModel = require("./EntityModel");

module.exports = (function () {
    "use strict";

    var ItemModel = Object.create(EntityModel);

    ItemModel.itemTypes = {
        SWORD: 1,
        SHIELD: 2,
        CHEST: 3,
        BOOTS: 4,
        HELM: 5,
        WRISTS: 6,
        GLOVES: 7,
        LEGS: 8,
        RING: 9,
        AMULET: 10
    };

    // TODO figure out basic stats
    //      - attack / monster health ratio
    //      - monster damage / armor
    //      - item bonus strategy
    // TODO make item bonuses
    // TODO apply item bonuses to char

    ItemModel.initialize([
        { id:  1, type: ItemModel.itemTypes.SWORD, min_equip_level:  1, "name": "ITEM_WOODEN_SWORD",                bonus: {attack:  1} },
        { id:  2, type: ItemModel.itemTypes.SWORD, min_equip_level:  5, "name": "ITEM_COPPER_KNIFE",                bonus: {attack:  2} },
        { id:  3, type: ItemModel.itemTypes.SWORD, min_equip_level:  7, "name": "ITEM_COPPER_SWORD",                bonus: {attack:  4} },
        { id:  4, type: ItemModel.itemTypes.SWORD, min_equip_level: 13, "name": "ITEM_COPPER_AXE",                  bonus: {attack:  5} },
        { id:  5, type: ItemModel.itemTypes.SWORD, min_equip_level: 19, "name": "ITEM_IRON_SWORD",                  bonus: {attack:  7} },
        { id:  6, type: ItemModel.itemTypes.SWORD, min_equip_level: 25, "name": "ITEM_IRON_LONGSWORD",              bonus: {attack:  9} },
        { id:  7, type: ItemModel.itemTypes.SWORD, min_equip_level: 31, "name": "ITEM_COPPER_MACE",                 bonus: {attack: 11} },
        { id:  8, type: ItemModel.itemTypes.SWORD, min_equip_level: 39, "name": "ITEM_TITANIUM_MACE",               bonus: {attack: 14} },
        { id:  9, type: ItemModel.itemTypes.SWORD, min_equip_level: 50, "name": "ITEM_TITANIUM_LONGSWORD",          bonus: {attack: 19} },
        { id: 10, type: ItemModel.itemTypes.SWORD, min_equip_level: 59, "name": "ITEM_ANNEALED_TITANIUM_LONGSWORD", bonus: {attack: 23} }
    ]);

    return ItemModel;

}());
