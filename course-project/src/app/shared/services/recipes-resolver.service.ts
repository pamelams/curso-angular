import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipesService } from "./recipes.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private recipesService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        if(this.recipesService.getRecipes().length == 0) {
            return this.recipesService.fetchRecipes();
        } else {
            return this.recipesService.getRecipes();
        }
    }
}