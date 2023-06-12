import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "src/app/recipes/recipe.model";
import { Ingredient } from "../ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject, map, take } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class RecipesService {
    private recipes: Recipe[] = [];
    private defaultRecipes: Recipe[] = [
        new Recipe('Crepioca', 
        "Crepioca is made from a batter with egg and tapioca flour. It is more filling than the tapioca crepe, made just with water, so you don’t need any topping, but if you wish, you can add your favourite sweet or savoury filling.", 
        'https://www.emporiumpax.com.br/wp-content/uploads/2022/03/receita-de-receita-de-crepioca-simples-com-apenas-3-ingredientes.webp',
        [new Ingredient('Milk', 1), new Ingredient('Olive Oil', 1), new Ingredient('Egg', 3),
        new Ingredient('Tapioca starch', 1),new Ingredient('Salt', 1),new Ingredient('Parmesan Cheese', 1)]),
        new Recipe('Quick Quesadillas', 
        "These quick cooking quesadillas are loaded with cheese, salsa and green onions and are perfect for those busy weeknights when you don't have a lot of time. They're easy, kid-friendly and just plain good!", 
        'data:image/jpeg;base64,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',
        [new Ingredient('Flour tortilla', 6), new Ingredient('Monterey Jack cheese', 1), new Ingredient('Green onion', 2), 
        new Ingredient('Chunky Salsa', 1), new Ingredient('Canola oil', 1)])
      ];
      recipesChanged = new Subject<void>();

      constructor(private shoppingListService: ShoppingListService, private http: HttpClient) { }

      initializeDefaultRecipes() {
        this.saveRecipes(this.defaultRecipes);
        this.recipesChanged.pipe(take(1)).subscribe(() => this.fetchRecipes());
      }

      getRecipes() {
        return this.recipes ? this.recipes.slice() : [];
      }

      getRecipe(index: number): Recipe {
        return this.recipes[index];
      }

      addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipesChanged.next();
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next();
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next();
      }

      addtoShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }

      saveRecipes(recipes: Recipe[] = this.recipes) {
        this.http.put('https://recipe-book-5500d-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
          //this.recipesChanged.next(); 
        });       
      }

      fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipe-book-5500d-default-rtdb.firebaseio.com/recipes.json').
        pipe(map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients: [] as Ingredient[] };
          });
        }), tap(recipes => {
          console.log('receitas:', recipes);
          this.recipes = recipes;
          this.recipesChanged.next();
        }));
      }
}