/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone"),
        _ = require("underscore");
    return Backbone.View.extend({
        el: ".index_view",
        initialize: function () {
            _.bindAll(this, "toggleAutoAttack", "onAutoAttackStart", "onAutoAttackEnd");
            this.model.on("autoAttack:start", this.onAutoAttackStart);
            this.model.on("autoAttack:end", this.onAutoAttackEnd); // current auto attack cooled down
        },
        events: {
            "click .auto_attack_toggle": "toggleAutoAttack"
        },
        onAutoAttackStart: function () {
            var attack_cooldown_node = this.el.querySelector(".attack_cooldown"),
                attack_cooldown_text_node = this.el.querySelector(".attack_cooldown_text");
            attack_cooldown_node.classList.add("animate");
            attack_cooldown_node.style.width = "0px";
            this.cooldownTextUpdateInterval = setInterval(function () {
                var width = parseInt(attack_cooldown_node.offsetWidth, 10);
                attack_cooldown_text_node.textContent = (width / 515 * 4).toFixed(1) + " s";
            }, 100);
        },
        onAutoAttackEnd: function () {
            var attack_cooldown_node = this.el.querySelector(".attack_cooldown");
            attack_cooldown_node.classList.remove("animate");
            attack_cooldown_node.style.width = "515px";
            (function () { return attack_cooldown_node.offsetHeight; }()); // trigger a reflow to reset CSS animation
        },
        startAutoAttack: function () {
            this.el.querySelector(".auto_attack_toggle").innerHTML = "Stop Auto Attack";
            this.model.startAutoAttack();
        },
        stopAutoAttack: function () {
            window.setTimeout(function () {
                window.clearInterval(this.cooldownTextUpdateInterval);
            }, this.model.get("autoAttackCooldown"));
            this.el.querySelector(".auto_attack_toggle").innerHTML = "Start Auto Attack";
            this.model.stopAutoAttack();
        },
        toggleAutoAttack: function () {
            if (this.model.get("autoAttack") === true) {
                this.stopAutoAttack();
            } else {
                this.startAutoAttack();
            }
        }
    });
});
