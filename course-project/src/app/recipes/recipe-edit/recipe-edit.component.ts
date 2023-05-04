import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from 'src/app/shared/services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id !: number;
  editMode = false;
  description!: string;
  recipeForm!: FormGroup;
  ingredients: {name: string, amount: number}[] = [];

  constructor(private route: ActivatedRoute, private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
    
    
  }

  private initForm() {
    this.recipeForm = new FormGroup({
      'name': new FormControl((this.editMode ? this.recipeService.getRecipe(this.id).name : null), Validators.required),
      'imagePath': new FormControl((this.editMode ? this.recipeService.getRecipe(this.id).imagePath : null)),
      'description': new FormControl((this.editMode ? this.recipeService.getRecipe(this.id).description : null), Validators.required),
      'ingredients': new FormArray([]),
    });

  }

  onSubmit() {

  }

  onAddIngredient() {

  }
}
