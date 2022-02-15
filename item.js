const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    pic: {
        type: String,
        default: "",
        required: true
    },
    tag: {
        type: String,
        default: "",
    },
    disc: {
        type: String,
        default: "",
    },
}
)

module.exports = mongoose.model("item", itemSchema)
