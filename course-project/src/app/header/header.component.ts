import { Component } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    collapsed = true;

    constructor(private recipesService: RecipesService) {

    }

    onSaveData() {
        this.recipesService.saveRecipes();
    }

    onFetchData() {
        this.recipesService.fetchRecipes();
    }
        
}