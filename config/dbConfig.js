const dotenv = require("dotenv");
dotenv.load();

module.exports = {
    connectionString: () => {
        const dbConnectionString = process.env.MONGOCONNECTION;
        return dbConnectionString;
    },
};
