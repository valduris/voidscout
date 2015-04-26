var Player = Object.create(Base);

Player.defaults = {
    'hp': 10,
    'hp_max': 10,
    'armor': 1,
    'damage': 1,
    'level': 1,
    'experience': 0,
    'items': [],
    'attack_timeout': 10000
};

Player.properties = [
    'hp',
    'hp_max',
    'armor',
    'damage',
    'level',
    'experience',
    'items',
    'attack_timeout'
];

Player.init = function( args ) {
    args = args || {};
    Player.properties.forEach( function ( property ) {
        Player[ property ] = args[ property ] || Player.defaults[ property ];
    });
    return this;
};

Player.attack = function ( target ) {
    target.hp -= this.damage;
};