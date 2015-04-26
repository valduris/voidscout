document.addEventListener("DOMContentLoaded", function(event) {
    //var player_1 = Object.create( Player ).init();
    //var player_2 = Object.create( Player ).init();

    //player_1.attack( player_2 );

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

    var PlayerModel = Backbone.Model.extend({
        urlRoot: '/player',
        defaults: {
            name: '',
            email: ''
        }
    });
    var player = new PlayerModel();
    // Notice that we haven't set an `id`
    var playerDetails = {
        name: 'Thomas',
        email: 'thomasalwyndavis@gmail.com'
    };
    // Because we have not set a `id` the server will call
    // POST /user with a payload of {name:'Thomas', email: 'thomasalwyndavis@gmail.com'}
    // The server should save the data and return a response containing the new `id`
    player.save(playerDetails, {
        success: function (user) {
            alert(user.toJSON());
        }
    })

});