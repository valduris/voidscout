/*global define, window, requirejs*/
requirejs.config({
    baseUrl: "./js",
    paths: {
        jquery: "./lib/jquery-ajax-2.1.1.min",
        backbone: "./lib/backbone-1.1.2.min",
        underscore: "./lib/underscore-1.8.3.min"
    }
});

define(function (require) {
    "use strict";
    var $ = require("jquery"),
        GameModel = require("models/GameModel");
    $(function () {
        window.game = new GameModel();
    });
});
