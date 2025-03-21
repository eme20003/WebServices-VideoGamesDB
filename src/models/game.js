const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameTitle: { type: String, required: true },
    consoles: [{ type: String }],  // Array of consoles
    developer: { type: String },
    publisher: { type: String },
    genre: [{ type: String }],  // Array of genres
    shortSummary: { type: String },
    rating: { type: String },
    releaseDate: { type: Date },  // Convert date format when inserting
    recommended: { type: Boolean }
});

// Pre-save hook to convert "recommended" field to boolean
gameSchema.pre("save", function (next) {
    if (typeof this.recommended === "string") {
        this.recommended = this.recommended.toLowerCase() === "yes";
    }
    next();
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;