var Base = {};

Base.properties = [];

Base.toString = function () {
    var result = '{';
    for( var i = 0; i < this.properties.length; i += 1 ) {
        result += this.properties[i] + ': ' + this[ this.properties[i] ] + ', ';
    }
    result.slice(0, -1);
    return result += '}'
};