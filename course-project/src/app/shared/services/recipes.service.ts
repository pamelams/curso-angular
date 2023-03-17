import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "src/app/recipes/recipe.model";
import { Ingredient } from "../ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({providedIn: 'root'})
export class RecipesService {
    recipeItemSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A test recipe', 
        'This is a text', 
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
        [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
        new Recipe('New test recipe', 
        'This is a new text', 
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
        [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)])
      ];

      constructor(private shoppingListService: ShoppingListService) {}

      getRecipes() {
        return this.recipes.slice();
      }

      addtoShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }
}