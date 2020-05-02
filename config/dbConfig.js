const dotenv = require("dotenv");
dotenv.load();

module.exports = {
    connectionString: () => {
        const dbConnectionString = process.env.MONGODB_URI;
        return dbConnectionString;
    },
};
