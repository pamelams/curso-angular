import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipesService } from "./recipes.service";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private recipesService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        console.log('pegando as receitas');
        if(this.recipesService.getRecipes().length == 0) {
            console.log('fazendo fetch');
            return this.recipesService.fetchRecipes().pipe(tap(recipes => {
                console.log('dento do fetch');
                console.log(recipes);
            }));            
        } else {
            console.log('fazendo get');
            return this.recipesService.getRecipes();
        }
    }
}