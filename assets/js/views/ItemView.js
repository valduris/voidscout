/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone"),
        _ = require("underscore"),
        IntventoryItemOverlayView = require("views/IntventoryItemOverlayView");
    return Backbone.View.extend({
        tagName: "div",
        className: "item_slot",
        template: _.template(document.querySelector("#item_view_template").innerHTML),
        initialize: function () {
            _.bindAll(this, "onMouseEnter", "onMouseLeave");
        },
        events: {
            "mouseenter": "onMouseEnter",
            "mouseleave": "onMouseLeave"
        },
        render: function () {
            this.el.innerHTML = this.template(this.model.attributes);
            return this;
        },
        onMouseEnter: function () {
            this.intventoryItemOverlayView = new IntventoryItemOverlayView({
                model: this.model
            });

            this.el.appendChild(this.intventoryItemOverlayView.el);
        },
        onMouseLeave: function () {
            this.intventoryItemOverlayView.remove();
        }
    });
});
