const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    connectionString: () => {
        const dbConnectionString = process.env.MONGODB_URI;
        return dbConnectionString;
    },
};
