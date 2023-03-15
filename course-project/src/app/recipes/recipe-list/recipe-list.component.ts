import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];
  
  @Output() recipeSelectedOnList = new EventEmitter<Recipe>();

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }

  recipeReceived(recipe: Recipe) {
    this.recipeSelectedOnList.emit(recipe);
  }

}
