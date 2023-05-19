import mongoose from 'mongoose';

//schema- an object that defines the structure of our data
const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: [{type: String, required: true}], //array of ingredients
    instructions: {type: String, required: true},
    imageURL: {type: String, required: true},
    cookingTime: {type: Number, required: true},
    userOwner: {type: mongoose.Schema.Types.ObjectID, ref:"users", required:true}
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema); //table called users that looks like userschema
