import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 8)
    ];
    ingredientsChanged = new EventEmitter();
    
    getIngredients() {
        return this.ingredients.slice();
    }
    addIngredient(ingredientName: string, ingredientAmount: number) {
        const newIngredient = new Ingredient(ingredientName, ingredientAmount);
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.emit();
    }
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit();
    }
}