/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone"),
        _ = require("underscore");
    return Backbone.View.extend({
        tagName: "div",
        className: "inventory_item_overlay_view",
        initialize: function () {
            this.render();
        },
        template: _.template(document.querySelector("#inventory_item_overlay_view_template").innerHTML),
        render: function () {
            this.el.innerHTML = this.template(this.model.attributes);
        }
    });
});
