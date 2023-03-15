import { Injectable } from "@angular/core";
import { Recipe } from "src/app/recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class RecipesService {
    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'This is a text', 
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
        new Recipe('New test recipe', 'This is a new text', 
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
      ];

      getRecipes() {
        return this.recipes.slice();
      }
}