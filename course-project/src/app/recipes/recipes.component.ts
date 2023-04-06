import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipeSelected!: Recipe;
  isRecipeSelected: boolean = false;

  constructor(private recipesService: RecipesService,
    private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipesService.recipeItemSelected.subscribe(
      (recipe: Recipe) => {
        this.recipeSelected = recipe;
      }
    );
  }
}
