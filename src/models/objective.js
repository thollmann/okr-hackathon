const mongoose = require("mongoose");
const dbConfig = require("../../config/dbConfig");
const conn = dbConfig.connectionString();
mongoose.connect(conn, { useNewUrlParser: true });

const ObjectiveSchema = new mongoose.Schema({
    startDate: Date,
    completionDate: Date,
    label: String,
    keyresults: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "KeyResult",
        },
    ],
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
});

module.exports = mongoose.model("Objective", ObjectiveSchema);
