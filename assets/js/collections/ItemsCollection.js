/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone"),
        ItemModel = require("../models/ItemModel");
    return Backbone.Collection.extend({
        model: ItemModel
    });
});
