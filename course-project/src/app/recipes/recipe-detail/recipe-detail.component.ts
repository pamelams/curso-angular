import { Component, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe!: Recipe;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddIngToShoppList() {
    for(let ingredient of this.recipe.ingredients) {
      this.shoppingListService.addIngredient(ingredient.name, ingredient.amount);
    }

  }

}
