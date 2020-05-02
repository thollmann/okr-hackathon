const mongoose = require("mongoose");
const dbConfig = require("../../config/dbConfig");
const conn = dbConfig.connectionString();
mongoose.connect(conn, { useNewUrlParser: true });

module.exports = mongoose.model("Objective", {
    completionDate: Date,
    label: String,
});
