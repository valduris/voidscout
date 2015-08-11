/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone"),
        ItemView = require("views/ItemView");
    return Backbone.View.extend({
        el: ".worn_items_view",
        initialize: function () {
            this.render();
            this.listenTo(this.model.wornItemsCollection, "add", this.render, this);
        },
        render: function () {
            var self = this;
            this.el.innerHTML = "";
            this.model.wornItemsCollection.each(function (item) {
                var itemView = new ItemView({
                    model: item
                });
                self.el.appendChild(itemView.render().el);
            });
        }
    });
});
