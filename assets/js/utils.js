/*global define*/
define(function () {
    var utils = {};

    utils.deepFreeze = function (object) {
        Object.freeze(object);
        for (var key in object) {
            if (typeof object[key] === "object") {
                utils.deepFreeze(object[key]);
            }
        }
        return object;
    };

    utils.randomFromRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return utils;
});
