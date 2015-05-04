define('EntityModel', ["backbone"], function (Backbone) {

    return Backbone.Model.extend({
        defaults: {
            name: '',
            email: ''
        },
        toString: function () {
            var result = '{';
            for( var i = 0; i < this.properties.length; i += 1 ) {
                result += this.properties[i] + ': ' + this[ this.properties[i] ] + ', ';
            }
            result.slice(0, -2);
            return result += '}';
        }
    });

});
