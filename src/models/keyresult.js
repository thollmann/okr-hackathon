const mongoose = require("mongoose");
const dbConfig = require("../../config/dbConfig");
const conn = dbConfig.connectionString();
mongoose.connect(conn, { useNewUrlParser: true });

module.exports = mongoose.model("KeyResult", {
    objective: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Objective",
    },
    label: String,
    type: String,
    minValue: Number,
    maxValue: Number,
    weight: Number,
    decimals: Number,
});
