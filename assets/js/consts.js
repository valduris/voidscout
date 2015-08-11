/*global define*/
define(function (require) {
    "use strict";
    var utils = require("utils"),
        constants = {};

    constants.entityTypes = {
        ENTITY_BASE: "ENTITY_BASE",
        ENTITY_PLAYER: "ENTITY_PLAYER",
        ENTITY_NPC: "ENTITY_NPC", // says "howdy journeyman!"
        ENTITY_ENEMY: "ENTITY_ENEMY" // says "aargh"
    };

    constants.itemTypes = {
        CAPE: 0x1,
        HELME: 0x2,
        AMULET: 0x3,
        WRISTS: 0x4,
        CHEST: 0x5,
        GLOVES: 0x6,
        RING: 0x7,
        LEGS: 0x8,
        BRACELET: 0x9,
        SWORD: 0xa,
        BOOTS: 0xb,
        SHIELD: 0xc
    };

    return utils.deepFreeze(constants);

    // items
    // ITEM_WOODEN_SWORD
    // ITEM_COPPER_KNIFE
    // ITEM_COPPER_SWORD
    // ITEM_COPPER_AXE
    // ITEM_IRON_SWORD
    // ITEM_IRON_LONGSWORD
    // ITEM_COPPER_MACE
    // ITEM_TITANIUM_MACE
    // ITEM_TITANIUM_LONGSWORD


});