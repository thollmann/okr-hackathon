const mongoose = require("mongoose");
const dbConfig = require("../../config/dbConfig");
const conn = dbConfig.connectionString();
mongoose.connect(conn, { useNewUrlParser: true });

module.exports = mongoose.model("Team", {
    label: String,
    objectives: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Objective",
        },
    ],
});
