import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipesActions from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe!: Recipe;
  id: number = 0;

  constructor(private route: ActivatedRoute, private router: Router,
    private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.id = id
      return this.store.select('recipes');
    }), map(recipesState => {
      return recipesState.recipes.find((recipe, index) => {
        return index === this.id;
      })
    })).subscribe(recipe => {
      if(recipe) {
        this.recipe = recipe;
      }
    });
  }

  onAddToShoppingList() {
    this.store.dispatch(ShoppingListActions.addIngredients({ingredients: this.recipe.ingredients}));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipesActions.deleteRecipe({index: this.id}));
    this.router.navigate(['recipes'], { relativeTo: null });
  }
}
