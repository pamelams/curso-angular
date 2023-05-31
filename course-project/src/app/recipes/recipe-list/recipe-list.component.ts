import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  private subscription!: Subscription

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.recipesService.initializeDefaultRecipes();
    this.subscription = this.recipesService.recipesChanged.subscribe(
      () => {
        this.recipes = this.recipesService.getRecipes();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }

}
