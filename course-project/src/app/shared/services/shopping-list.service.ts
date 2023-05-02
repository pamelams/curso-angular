import { Injectable } from "@angular/core";
import { Ingredient } from "../ingredient.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 8)
    ];
    ingredientsChanged = new Subject<void>();
    startedEditing = new Subject<number>();
    
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredientName: string, ingredientAmount: number) {
        const newIngredient = new Ingredient(ingredientName, ingredientAmount);
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.next();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next();
    }
}