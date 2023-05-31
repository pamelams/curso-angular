import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { CanDeactivateGuard } from "./shared/guards/can-deactive-guard.service";
import { RecipesResolverService } from "./shared/services/recipes-resolver.service";

const appRoutes: Routes = [
    { path: '' , redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes' , component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent, resolve: [RecipesResolverService] },
        { path: 'new', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuard] },
        { path: ':id/edit', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuard], resolve: [RecipesResolverService] },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    ] },
    { path: 'shopping-list' , component: ShoppingListComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}