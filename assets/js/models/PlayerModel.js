/*global define */
define(function (require) {
    "use strict";
    var _ = require("underscore"),
        utils = require("utils"),
        consts = require("consts"),
        ItemModel = require("models/ItemModel"),
        EntityModel = require("models/EntityModel"),
        Connection = require("models/ConnectionModel"),
        ItemsCollection = Backbone.Collection.extend({ model: ItemModel });

    return EntityModel.extend({
        defaults: _.extend({}, EntityModel.prototype.defaults, {
            autoAttack: false,
            autoAttackTimeout: null,
            autoAttackCooldown: 4000,
            autoAttackTarget: 1,
            connection: null,
            name: null,
            email: null,
            health: 99,
            maxHealth: 100,
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
            var i;

            EntityModel.prototype.initialize.apply(self, arguments);
            this.inventoryItemsCollection = new ItemsCollection();
            this.wornItemsCollection = new ItemsCollection();
            this.inventoryItemsCollection.add(this.get("wornItems"));

            for (var itemType in consts.itemTypes) {
                this.wornItemsCollection.add( new ItemModel({
                    name: itemType,
                    min_equip_level: 1,
                    type: itemType,
                    bonus: null
                }));
            }

            this.connection = new Connection();
            this.listenTo(this.connection, "auto_attack", function (payload) {
                // TODO add health bar logic
                if (payload.won === true) {
                    this.set("killed", this.get("killed") + 1);
                    this.set("experience", this.get("experience") + payload.xp);
                    this.set("items", this.get("items").concat(payload.items));
                    for (i = 0; i < payload.items.length; i++) {
                        this.inventoryItemsCollection.add(payload.items[i]);
                    }
                }
                this.set("health", this.get("health") - utils.randomFromRange(2, 10));
            });
            this.connection.on("broadcast", function (data) {
                console.log("broadcast ->", data);
            });
            this.on("change:experience", this.updateLevel);
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
