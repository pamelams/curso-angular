import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;

  constructor(private recipesService: RecipesService,
    private router: Router, private route: ActivatedRoute) {}

  onRecipeSelected() {
    this.recipesService.recipeItemSelected.emit(this.recipe);
  }
  

}

