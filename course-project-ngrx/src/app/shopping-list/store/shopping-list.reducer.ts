import { createReducer, on } from "@ngrx/store"
import { Ingredient } from "../../shared/ingredient.model"
import { addIngredient, addIngredients, deleteIngredient, startEdit, stopEdit, updateIngredient } from "./shopping-list.actions";

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient | null;
    editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 8)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export const shoppingListReducer = createReducer(
    initialState, 
    on(addIngredient, (state, action) => {
        return {
            ...state, 
            ingredients: [...state.ingredients, action.ingredient]
        };
    }),
    on(addIngredients, (state, action) => {
        return {
            ...state, 
            ingredients: [...state.ingredients, ...action.ingredients]
        };
    }),
    on(updateIngredient, (state, action) => {
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.editedIngredientIndex] = action.ingredient;
        return {
            ...state, 
            ingredients: updatedIngredients,
            editedIngredientIndex: -1,
            editedIngredient: null
        };
    }),
    on(deleteIngredient, (state, action) => {
        return {
            ...state, 
            ingredients: state.ingredients.filter((ing, ingIndex) => ingIndex !== state.editedIngredientIndex),
            editedIngredientIndex: -1,
            editedIngredient: null
        };
    }),
    on(startEdit, (state, action) => {
        return {
            ...state,
            editedIngredientIndex: action.index,
            editedIngredient: {...state.ingredients[action.index]}
        }
    }),
    on(stopEdit, (state, action) => {
        return {
            ...state,
            editedIngredientIndex: -1,
            editedIngredient: null
        }
    })
);