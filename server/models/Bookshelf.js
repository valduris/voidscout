module.exports = (function () {
    "use strict";

    var config = {
            client: "postgres",
            connection: {
                host: "localhost",
                user: "postgres",
                password: "postgres",
                database: "postgres",
                charset: "utf8"
            }
        },
        knex = require("knex")(config),
        Bookshelf = require("bookshelf")(knex);

    Bookshelf.plugin("registry");

    return Bookshelf;

}());
