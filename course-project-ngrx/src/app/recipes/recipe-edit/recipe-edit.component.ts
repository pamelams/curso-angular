import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { CanComponentDeactivate } from 'src/app/shared/guards/can-deactive-guard.service';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash'; 
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, CanComponentDeactivate {
  id !: number;
  editMode = false;
  changesSaved = false;
  description!: string;
  recipeForm!: FormGroup;
  initialRecipeForm!: FormGroup;
  ingredients: {name: string, amount: number}[] = [];

  constructor(private route: ActivatedRoute, private recipeService: RecipesService,
    private router: Router) { }

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
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl((this.editMode ? this.recipeService.getRecipe(this.id).name : null), Validators.required),
      'imagePath': new FormControl((this.editMode ? this.recipeService.getRecipe(this.id).imagePath : null), Validators.required),
      'description': new FormControl((this.editMode ? this.recipeService.getRecipe(this.id).description : null), Validators.required),
      'ingredients': recipeIngredients,
    });
    this.initialRecipeForm = cloneDeep(this.recipeForm);
  }

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    const index = this.recipeService.getRecipes().length - 1;
    this.changesSaved = true;
    this.router.navigate(['recipes', index], { relativeTo: null }); 
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if(this.changesSaved || this.recipeForm.pristine) {
      return true;
    }
    else {
      return confirm('Do you want to discard the changes?');
    }
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}


