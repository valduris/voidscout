/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone"),
        _ = require("underscore"),
        ItemView = require("views/ItemView");
    return Backbone.View.extend({
        el: ".items_view",
        initialize: function () {
            this.render();
            this.model.itemsCollection.on("add", _.bind(this.render, this));
        },
        render: function () {
            var self = this;
            this.el.innerHTML = "";
            this.model.itemsCollection.each(function (item) {
                var itemView = new ItemView({
                    model: item
                });
                self.el.appendChild(itemView.render().el);
            });
        }
    });
});
