import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from '@ngrx/effects';
import { Recipe } from "src/app/recipes/recipe.model";
import { AppState } from "src/app/store/app.reducer";
import { Store } from "@ngrx/store";
import * as RecipesActions from '../../recipes/store/recipes.actions'
import { map, switchMap, take } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<{recipes: Recipe[]}> {
    constructor(private store: Store<AppState>, private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipeState => recipeState.recipes),
            switchMap(recipes => {
                if(recipes.length === 0) {
                    this.store.dispatch(RecipesActions.fetchRecipes());
                    return this.actions$.pipe(ofType(RecipesActions.setRecipes), take(1));
                } else {
                    return of({recipes: recipes});
                }
            })
        );
    }
}