import { Component, Input } from '@angular/core';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe!: Recipe;

  constructor(private recipesService: RecipesService) {}

  onAddToShoppingList() {
    this.recipesService.addtoShoppingList(this.recipe.ingredients);
  }

}
