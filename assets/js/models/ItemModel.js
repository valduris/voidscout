/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone"),
        consts = require("consts");
    return Backbone.Model.extend({
        initialize: function () {
            //    TODO compare item level with that of player
            //this.set("type", consts.itemTypes[t]);
            this.properties = [];
        }
    });

});
