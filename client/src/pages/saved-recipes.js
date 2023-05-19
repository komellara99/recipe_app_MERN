import React, {useEffect, useState} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID"

export const SavedRecipes = () => {
    const userID = useGetUserID();
    const [savedRecipes, setSavedRecipes] = useState([]); //array of recipe ids
    
    useEffect(()=> {
       const fetchSavedRecipes = async () => {
        try {
            //we get an array of recipe ids that we saved
            const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
            setSavedRecipes(response.data);
          } catch (error) {
            console.error(error);
          }
       }
       //fetchRecipes();
       fetchSavedRecipes();
    }, [])

    

    return (<div>
        <h2>
            My saved recipes
        </h2>
        <ul>
            {savedRecipes.map((recipe)=>(
                <li key={recipe._id}>
                    <div>
                        <h3>{recipe.name}</h3>
                    </div>
                    <br/>
                    <img src={recipe.imageURL}/>
                    <div>
                        <p>{recipe.ingredients}</p>
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