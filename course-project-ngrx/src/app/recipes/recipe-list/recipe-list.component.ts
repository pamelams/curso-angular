import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  private subscription!: Subscription

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
    .pipe(map(recipesState => recipesState.recipes))
    .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
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
