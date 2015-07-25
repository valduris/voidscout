/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone");
    return Backbone.Model.extend({
        defaults: {
            name: "name",
            level: "12"
        },
        initialize: function () {
            this.properties = [];
        }
    });

});
