define("EntityModel", ["backbone"], function (Backbone) {
    "use strict";
    return Backbone.Model.extend({
        defaults: {
            name: "entity"
        },
        initialize: function () {
            this.properties = [];
        },
        toString: function () {
            var result = "{",
                i;
            for (i = 0; i < this.properties.length; i += 1) {
                result += this.properties[i] + ": " + this.properties[i] + ", ";
            }
            result.slice(0, -2);
            return result += "}";
        }
    });

});
