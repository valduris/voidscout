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
            level: 0,
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
            //_.bindAll(this, "getExperienceToNextLevel");
            // bind events
            self.connection.on("auto_attack", function (payload) {
                if (payload.won === true) {
                    self.set("killed", self.get("killed") + 1);
                    self.set("experience", self.get("experience") + 60);
                }
            });
            self.connection.on("broadcast", function (data) {
                console.log("broadcast ->", data);
            });
            self.on("change:experience", this.updateLevel);
            console.log(this.getExperienceToNextLevel());
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
            this.trigger("autoAttack:stop");
        },
        setAutoAttackTarget: function (npcName) {
            this.set("autoAttackTarget", npcName);
        },
        updateLevel: function () {
            if (this.get("experience") >= this.getExperienceToNextLevel()) {
                this.set("level", this.get("level") + 1);
            }
        },
        getExperienceForLevel: function (level) {
            return level === 0 ? 100 : Math.floor(level / 2 * 100) + level * 50;
        },
        getExperienceToNextLevel: function () {
            return this.getExperienceForLevel(this.get("level"));
        }
    });
});
