/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone"),
        _ = require("underscore");
    return Backbone.View.extend({
        tagName: "li",
        className: "entry",
        template: _.template(document.querySelector("#item_view_template").innerHTML),
        render: function () {
            this.el.innerHTML = this.template(this.model.attributes);
            return this;
        }
    });
});
