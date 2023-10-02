import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipes.actions'
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Injectable()
export class RecipesEffects {
    fetchRecipes$ = createEffect(() => {
        return this.actions$.pipe(ofType(RecipesActions.fetchRecipes),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                'https://recipe-book-5500d-default-rtdb.firebaseio.com/recipes.json'
              )
        }),map(recipes => {
            if(recipes) {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients: [] as Ingredient[] };
                  });
            } else {
                return [];
            }
        }), map(recipes => {
            return RecipesActions.setRecipes({recipes: recipes});
        }))
    });

    storeRecipes$ = createEffect(() => {
        return this.actions$.pipe(ofType(RecipesActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(
                'https://recipe-book-5500d-default-rtdb.firebaseio.com/recipes.json', 
                recipesState.recipes
            );
        }));
    }, { dispatch: false });

    constructor(private actions$: Actions, private http: HttpClient, 
        private router: Router, private store: Store<AppState>) {}
}