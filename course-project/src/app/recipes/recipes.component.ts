import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  //@Output() recipeSelected = new EventEmitter<Recipe>();
  @Input() recipeSelected!: Recipe;

  recipeReceived(recipe: Recipe) {
    //this.recipeSelected.emit(recipe);
    this.recipeSelected = recipe;
  }
}
