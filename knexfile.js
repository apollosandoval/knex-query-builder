module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: "gClasses",
            host: "localhost"
        }
    },
    production: {
        client: 'pg',
        connection: process.emitWarning.DATABASE_URL
    }
};