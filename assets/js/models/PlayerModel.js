/*global define */
define("PlayerModel", ["underscore", "EntityModel", "Connection"], function (_, EntityModel, Connection) {
    "use strict";
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
            killed: 0
        }),
        urlRoot: "/player",
        initialize: function () {
            var self = this;
            EntityModel.prototype.initialize.apply(self, arguments);
            self.connection = new Connection();
            // bind events
            self.connection.on("auto_attack", function (payload) {
                if (payload.won === true) {
                    self.set("killed", self.get("killed") + 1);
                }
                console.log(self.get("killed"));
            });
            self.connection.on("broadcast", function (data) {
                console.log("broadcast ->", data);
            });
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
        }
    });
});
