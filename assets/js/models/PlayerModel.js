/*global define */
define(function (require) {
    "use strict";
    var _ = require("underscore"),
        EntityModel = require("models/EntityModel"),
        Connection = require("models/ConnectionModel");

    return EntityModel.extend({
        defaults: _.extend({}, EntityModel.prototype.defaults, {
            autoAttack: false,
            autoAttackTimeout: null,
            autoAttackCooldown: 4000,
            autoAttackTarget: null,
            connection: null,
            name: null,
            email: null,
            hitPoints: 10,
            hitPointsMax: 10,
            armor: 1,
            damage: 1,
            level: 1,
            experience: 0,
            items: [],
            killed: 0,
            gold: 0
        }),
        urlRoot: "/player",
        initialize: function () {
            var self = this;
            EntityModel.prototype.initialize.apply(self, arguments);
            self.connection = new Connection();
            self.connection.on("auto_attack", function (payload) {
                if (payload.won === true) {
                    self.set("killed", self.get("killed") + 1);
                    self.set("experience", self.get("experience") + 120);
                }
            });
            self.connection.on("broadcast", function (data) {
                console.log("broadcast ->", data);
            });
            self.on("change:experience", this.updateLevel);
        },
        startAutoAttack: function () {
            this.set("autoAttack", true);
            this.triggerAutoAttack();
        },
        triggerAutoAttack: function () {
            var self = this;
            if (this.get("autoAttack")) {
                self.connection.emit("auto_attack", "auto attack data here =)");
                self.trigger("autoAttack:start");
            }
            self.autoAttackTimeout = setTimeout(function () {
                self.trigger("autoAttack:end");
                if (self.get("autoAttack")) {
                    self.triggerAutoAttack();
                } else {
                    clearInterval(this.autoAttackTimeout);
                }
            }, self.get("autoAttackCooldown"));
        },
        stopAutoAttack: function () {
            this.set("autoAttack", false);
        },
        setAutoAttackTarget: function (npcName) {
            this.set("autoAttackTarget", npcName);
        },
        updateLevel: function () {
            if (this.get("experience") >= this.getExperienceForLevel(this.get("level"))) {
                this.set("level", this.get("level") + 1);
            }
        },
        getExperienceForLevel: function (level) {
            return level === 1 ? 0 : (Math.floor(level / 2 * 100) + level * 100);
        }
    });
});
