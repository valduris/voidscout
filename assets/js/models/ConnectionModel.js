/*global define, WebSocket*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone");

    return Backbone.Model.extend({
        initialize: function () {
            var host = window.document.location.host.replace(/:.*/, ""),
                self = this;
            this.socket = new WebSocket("ws://" + host + ":8080");
            this.events = {};

            /*
            Wrap onmessage callback to have custom server side events.
             */
            this.socket.onmessage = function (message) {
                var data = JSON.parse(message.data);
                if (data.event) {
                    self.trigger(data.event, data.payload);
                }
            };
            this.on("auto_attack", function (payload) {
               //console.log("payload", payload);
            });
        },
        /*
         * emit event to ws server
         */
        emit: function (event, payload) {
            var self = this;
            if (this.socket.readyState !== 1) {
                setTimeout(function () {
                    self.emit(event, payload);
                }, 1);
            } else {
                this.socket.send(JSON.stringify({event: event, payload: payload}));
            }

        }
    });

});