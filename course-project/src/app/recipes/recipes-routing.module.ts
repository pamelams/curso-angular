import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { CanDeactivateGuard } from "../shared/guards/can-deactive-guard.service";
import { RecipesResolverService } from "../shared/services/recipes-resolver.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    { path: 'recipes' , component: RecipesComponent, canActivate: [AuthGuard], children: [
        { path: '', component: RecipeStartComponent, resolve: [RecipesResolverService] },
        { path: 'new', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuard] },
        { path: ':id/edit', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuard], resolve: [RecipesResolverService] },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}