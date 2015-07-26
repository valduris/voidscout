/*global define */
define(function (require) {
    "use strict";
    var _ = require("underscore"),
        EntityModel = require("models/EntityModel"),
        Connection = require("models/ConnectionModel"),
        ItemsCollection = require("collections/ItemsCollection");

    return EntityModel.extend({
        defaults: _.extend({}, EntityModel.prototype.defaults, {
            autoAttack: false,
            autoAttackTimeout: null,
            autoAttackCooldown: 4000,
            autoAttackTarget: 1,
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
            var self = this, i;
            EntityModel.prototype.initialize.apply(self, arguments);
            self.itemsCollection = new ItemsCollection();
            self.connection = new Connection();
            self.connection.on("auto_attack", function (payload) {
                //console.log(payload);
                // TODO add health bar logic
                if (payload.won === true) {
                    self.set("killed", self.get("killed") + 1);
                    self.set("experience", self.get("experience") + payload.xp);
                    self.set("items", self.get("items").concat(payload.items));
                    for (i = 0; i < payload.items.length; i++) {
                        self.itemsCollection.add(payload.items[i]);
                    }
                }
                //console.log("self.items", self.get("items"));
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
                self.connection.emit("auto_attack", {target: self.get("autoAttackTarget")});
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
        setAutoAttackTarget: function (monsterId) {
            this.set("autoAttackTarget", monsterId);
        },
        updateLevel: function () {
            if (this.get("experience") >= this.getExperienceForLevel(this.get("level"))) {
                this.set("level", this.get("level") + 1);
            }
        },
        getExperienceForLevel: function (level) {
            return level === 1 ? 100 : (Math.floor(level / 2 * 100) + level * 100);
        },
        applyItem: function (item) {
            for (var key in item.bonus) {
                if (item.bonus.hasOwnProperty(key)) {
                    this.set(key, this.get(key) + item.bonus[key]);
                }
            }
        },
        removeItem: function (item) {
            for (var key in item.bonus) {
                if (item.bonus.hasOwnProperty(key)) {
                    this.set(key, this.get(key) - item.bonus[key]);
                }
            }
        }
    });
});
