define("IndexView", ["backbone"], function (Backbone) {
    return Backbone.View.extend({
        el: ".index-view",
        initialize: function () {
            var attack_cooldown_node = document.querySelector('.attack_cooldown'),
                attack_cooldown_wrapper_node = document.querySelector('.attack_cooldown_wrapper'),
                attack_cooldown_text_node = document.querySelector('.attack_cooldown_text');

            setInterval( function () {
                attack_cooldown_node.classList.remove('animate');
                attack_cooldown_node.style.width = '400px';
                attack_cooldown_node.offsetHeight;
                attack_cooldown_node.classList.add('animate');
                attack_cooldown_node.style.width = '0px';
            }, 10 * 400 );

            setInterval( function () {
                var width = parseInt( attack_cooldown_node.offsetWidth );
                attack_cooldown_text_node.textContent = (width / 400 * 4).toFixed(1) + ' s';
            }, 50 );

            var host = window.document.location.host.replace(/:.*/, '');
            var ws = new WebSocket('ws://' + host + ':8080');
            ws.onmessage = function (event) {
                console.log(event.data);
            };
        }
    });
});
