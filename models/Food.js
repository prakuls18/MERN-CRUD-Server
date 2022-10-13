const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
});

const Food = mongoose.model("GroceryList", FoodSchema)
module.export = Food;