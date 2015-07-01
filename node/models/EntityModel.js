module.exports = (function () {
    "use strict";

    var EntityModel = {};

    EntityModel.initialize = function (store) {
        this.store = store;
        return this;
    };

    EntityModel.find = function (id) {
        for (var i = 0; i < this.store.length; i++) {
            if (this.store[i].id === id) {
                return this.store[i];
            }
        }
    };

    EntityModel.findBy = function (key, value) {
        for (var i = 0; i < this.store.length; i++) {
            if (this.store[i][key] == value) {
                return this.store[i];
            }
        }
    };

    EntityModel.set = function (id, key, value) {
        EntityModel.find(id)[key] = value;
    };

    return EntityModel;

}());
