module.exports = (function () {
    "use strict";

    var EntityModel = {};

    EntityModel.initialize = function (store) {
        this.store = store;
        return this;
    };

    EntityModel.find = function (char_name) {
        for (var i = 0; i < this.store.length; i++) {
            if (this.store[i].char_name === char_name) {
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

    EntityModel.set = function (char_name, key, value) {
        EntityModel.find(char_name)[key] = value;
    };

    return EntityModel;

}());
