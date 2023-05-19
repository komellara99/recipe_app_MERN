import {useState} from 'react';
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID"
import {useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie';

export const CreateRecipe = () => {
    const [cookies, _] = useCookies(["access_token"])
    const userID = useGetUserID();
    const [recipe, setRecipe] = useState({
        name : "" ,
	    ingredients : [], 
        instructions: "",    
        imageURL: "", 
	    cookingTime: 0, 
        userOwner: userID,
    });
    const navigate = useNavigate();
    
    //saves into recipe as we are typing
    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name] : value});
    }
    //adds another input for ingredient
    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    }

    //saves ingredients as we are typing
    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[index] = value;
        setRecipe({ ...recipe, ingredients });
    }
    //submits recipe
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post("http://localhost:3001/recipes", {...recipe}, {headers: {authorization: cookies.access_token}});
          alert(recipe.name)
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      };
    return (

        <div className="create-recipe">
            <h2>Create recipe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={handleChange} value={recipe.name} />
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, idx)=>(
                    <input key={idx} type="text" name="ingredients" value={ingredient} onChange={(event) => handleIngredientChange(event, idx)} />
                ))}
                <button onClick={addIngredient} type="button">Add ingredient</button>
                <label htmlFor="instructions">Instructions</label>
                <textarea id="instructions" name="instructions" onChange={handleChange} value={recipe.instructions}></textarea>
                <label htmlFor="imageURL">Image Url</label>
                <input type="text" id="imageURL" name= "imageURL" onChange={handleChange} value={recipe.imageUrl}/>
                <label htmlFor="cookingTime">Cooking time</label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} value={recipe.cookingTime}/>
                <button type="submit">Create recipe</button>
            </form>
        </div>
    )
}