module.exports = function ( app, store ) {

    app.get( '/', function ( req, res ) {
        res.render('index');
    });

};