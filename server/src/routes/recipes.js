
import {RecipeModel} from "../models/Recipes.js";
import {UserModel} from "../models/Users.js";
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {verifyToken} from "./users.js"

const router = express.Router();

//timeline
router.get("/", async (req, res) => {
try {
    const respose = await RecipeModel.find({})
    res.json(respose)
} catch (err) {
    res.json(err)
}
})
//add recipe
router.post("/", verifyToken, async (req, res) => {
    const { name, ingredients, instructions, imageURL, cookingTime, userOwner} = req.body;
    const recipe = new RecipeModel({ name, ingredients, instructions, imageURL, cookingTime, userOwner})
    
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err)
    }
    })
//save recipe
router.put("/", verifyToken, async (req, res) => {
    
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    } catch (err) {
        res.json(err)
    }
})
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        //const recipes = savedRecipes.map(function(){return (RecipeModel.findById("64653971c74073f225b8aaa6"))})
        res.json(user?.savedRecipes); //array of saved recipes ids
    } catch (err) {
        res.json(err)
    }
})
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes} //getting the recipes whos id is in users saved ones
        });
        res.json(savedRecipes); //array of saved recipes
    } catch (err) {
        res.json(err)
    }
})

export {router as recipesRouter};
