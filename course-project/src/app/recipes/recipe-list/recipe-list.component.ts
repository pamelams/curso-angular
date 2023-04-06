import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }

}
