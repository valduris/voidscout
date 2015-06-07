requirejs.config({
    paths: {
        jquery: "../js/lib/jquery-ajax-2.1.1.min",
        backbone: "../js/lib/backbone-1.1.2.min",
        underscore: "../js/lib/underscore-1.8.3.min"
    },
    waitSeconds: 30
});

document.addEventListener("DOMContentLoaded", function () {
    require(["./PlayerModel", "IndexView"], function (PlayerModel, IndexView) {
        $.get("/players/1",  function (playerData) {
            var player = new PlayerModel(playerData),
                indexView = new IndexView({
                    model: player
                });
        });
    });
});
