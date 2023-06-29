import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe!: Recipe;
  id!: number;

  constructor(private recipesService: RecipesService,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    //this.recipe = this.recipesService.getRecipe(+this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipesService.getRecipe(+params['id']);
        this.id = +params['id'];
      }
    )
  }

  onAddToShoppingList() {
    this.recipesService.addtoShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['recipes'], { relativeTo: null });
  }
}
