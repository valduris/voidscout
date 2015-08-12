/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone");
    return Backbone.View.extend({
        el: ".health_bar_view",
        initialize: function () {
            this.updateHealthBar();
            this.listenTo(this.model, "change:health", this.updateHealthBar);
        },
        updateHealthBar: function () {
            var healthBar = this.el.querySelector(".player_health_bar"),
                maxHealth = this.model.get("maxHealth"),
                health = this.model.get("health"),
                percentage = health / maxHealth,
                hue = (percentage * 120).toString(10);

            this.el.querySelector(".player_health_bar_text").textContent = health + " / " + maxHealth;
            healthBar.style.width = (percentage * 100) + "%";
            healthBar.style.backgroundColor = "hsl(" + hue + ",100%,40%)";
        }
    });
});
