//project starts here
import express from 'express'; //serves frontend
import cors from 'cors'; //rules between frontend and backend
import mongoose from 'mongoose'; //queries to mongodb

import { userRouter } from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'
//MERNpassword123
const app = express()
app.use(express.json()); //when sending data from the frontend it converts to json
app.use(cors());

app.use("/auth", userRouter); //endpoint, any endpoints in users.js will start with auth/
app.use("/recipes", recipesRouter);

mongoose.connect("mongodb+srv://riki1lara:PASSWORDHERE@recipes.w6rk9sx.mongodb.net/recipes?retryWrites=true&w=majority")

app.listen(3001, () => console.log("server running"));
