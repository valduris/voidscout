var Player = {},
    players = [
        {id: 1, "name": "Dukslis Kondrārs", "email": "dukslis@evolutiongaming.com", char_name: "dukslis", password: "123"},
        {id: 2, "name": "Iļja Kronovs", "email": "Iļja.Kronovs@gmail.com", char_name: "ilya", password: "234"}
    ];

Player.find = function (char_name) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].char_name === char_name) {
            return players[i];
        }
    }
};

Player.findBy = function (key, value) {
    for (var i = 0; i < players.length; i++) {
        if (players[i][key] == value) {
            return players[i];
        }
    }
}

Player.set = function (char_name, key, value) {
    Player.find(char_name)[key] = value;
};

module.exports = Player;
