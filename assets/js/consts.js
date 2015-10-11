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
        CAPE: "CAPE",
        HELMET: "HELMET",
        AMULET: "AMULET",
        WRISTS: "WRISTS",
        CHEST: "CHEST",
        GLOVES: "GLOVES",
        RING: "RING",
        LEGS: "LEGS",
        BRACELET: "BRACELET",
        SWORD: "SWORD",
        BOOTS: "BOOTS",
        SHIELD: "SHIELD"
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
