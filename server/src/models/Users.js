

//"template" for how the table in database should look like
import mongoose from 'mongoose';

//schema- an object that defines the structure of our data
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes", required: false}]
});

export const UserModel = mongoose.model("users", UserSchema); //table called users that looks like userschema
