document.addEventListener("DOMContentLoaded", function(event) {

    require(["PlayerModel", "IndexView"], function(PlayerModel, IndexView) {

        var player = new PlayerModel();
        var playerView = new IndexView();
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
        });

        console.log( player );


        //var player_1 = Object.create( Player ).init();
        //var player_2 = Object.create( Player ).init();

        //player_1.attack( player_2 );

    });

});
