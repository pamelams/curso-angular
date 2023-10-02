import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipes.actions';

export interface RecipesState {
    recipes: Recipe[];
}

const initialState: RecipesState = {
    recipes: []
};

export const recipesReducer = createReducer(
    initialState,
    on(RecipesActions.setRecipes, (state, action) => {
        return {
            ...state, 
            recipes: action.recipes
        };
    }),
    on(RecipesActions.addRecipe, (state, action) => {
        return {
            ...state, 
            recipes: [...state.recipes, action.newRecipe]
        };
    }),
    on(RecipesActions.updateRecipe, (state, action) => {
        const updatedRecipe = {
            ...state.recipes[action.index],
            ...action.newRecipe};
        const updatedRecipes = [...state.recipes];
        updatedRecipes[action.index] = updatedRecipe;
        return {
            ...state, 
            recipes: updatedRecipes
        };
    }),
    on(RecipesActions.deleteRecipe, (state, action) => {
        return {
            ...state, 
            recipes: state.recipes.filter((recipe, index) => index!== action.index)
        };
    }),
);