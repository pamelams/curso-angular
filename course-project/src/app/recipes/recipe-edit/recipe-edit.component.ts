import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
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
    let recipeIngredients = new FormArray<FormGroup<{ name: FormControl<string | null>, amount: FormControl<number | null>}>>([]);
    if(this.editMode) {
      if(this.recipeService.getRecipe(this.id)['ingredients']) {
        for(let ingredient of this.recipeService.getRecipe(this.id).ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount),
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl((this.editMode ? this.recipeService.getRecipe(this.id).name : null), Validators.required),
      'imagePath': new FormControl((this.editMode ? this.recipeService.getRecipe(this.id).imagePath : null)),
      'description': new FormControl((this.editMode ? this.recipeService.getRecipe(this.id).description : null), Validators.required),
      'ingredients': recipeIngredients,
    });

  }

  onSubmit() {

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl()
    }));

  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
