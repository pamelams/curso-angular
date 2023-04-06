import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '' , redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes' , component: RecipesComponent, children: [
        { path: '', component: SelectRecipeComponent },
        { path: ':id', component: RecipeDetailComponent },
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