import React, {useEffect, useState} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useCookies} from 'react-cookie';

export const Home = () => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"])
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState(["no likes"]);
    useEffect(()=> {
       const fetchRecipes = async () => {
        try {
            const response = await axios.get("http://localhost:3001/recipes");
            setRecipes(response.data);
            //console.log(response)
          } catch (error) {
            console.error(error);
          }
       }
       const fetchSavedRecipes = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
            console.log(response.data)
            setSavedRecipes(response.data);
          } catch (error) {
            console.error(error);
          }
       }
       fetchRecipes();
       if(cookies.access_token){ 
       fetchSavedRecipes()};
    }, [])

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {
              recipeID,
              userID,
            }, {headers: {authorization: cookies.access_token}});
            setSavedRecipes(response.data.savedRecipes);
            //console.log(response.data.savedRecipes)
            
          } catch (err) {
            console.log(err);
          }
    }
    
    const isRecipeSaved = (id) => savedRecipes.includes(id);
    

    return (<div>
        <h2>
            Recipes
        </h2>
        <ul>
            {recipes.map((recipe)=>(
                <li key={recipe._id}>
                    <div>
                        <h3>{recipe.name}</h3>
                        
                        <button 
                           onClick={() => saveRecipe(recipe._id)}
                           disabled={isRecipeSaved(recipe._id)}
                        >
                           {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                           
                        </button>
                    </div>
                    <br/>
                    <img src={recipe.imageURL}/>
                    <div>
                        {
                        recipe.ingredients.map((ingr)=>(
                          <p>{ingr}</p>
                        ))
                        }
                    </div>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                    </div>
                    <p>Cooking time: {recipe.cookingTime} mins</p>
                </li>)
            )}
        </ul>
    </div>
    )
}