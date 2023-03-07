import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a text', 
    'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
    new Recipe('New test recipe', 'This is a new text', 
    'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];
  @Output() recipeSelectedOnList = new EventEmitter<Recipe>();

  recipeReceived(recipe: Recipe) {
    this.recipeSelectedOnList.emit(recipe);
  }

}
