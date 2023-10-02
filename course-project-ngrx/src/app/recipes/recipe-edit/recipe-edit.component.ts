import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/shared/guards/can-deactive-guard.service';
import { Observable, Subscription } from 'rxjs';
import { cloneDeep } from 'lodash'; 
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipesActions from '../store/recipes.actions';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  id !: number;
  editMode = false;
  changesSaved = false;
  description!: string;
  recipeForm!: FormGroup;
  initialRecipeForm!: FormGroup;
  ingredients: {name: string, amount: number}[] = [];
  private storeSub?: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  ngOnDestroy(): void {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let recipeIngredients = new FormArray<FormGroup<{ name: FormControl<string | null>, amount: FormControl<number | null>}>>([]);
    this.storeSub = this.store.select('recipes').pipe(map(recipesState => {
      return recipesState.recipes.find((recipe, index) => {
        return index === this.id;
      })
    })).subscribe(recipe => {
      if(recipe && recipe.ingredients) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }));
        }
      }
      this.recipeForm = new FormGroup({
        'name': new FormControl(((this.editMode && recipe) ? recipe.name : null), Validators.required),
        'imagePath': new FormControl(((this.editMode && recipe) ? recipe.imagePath : null), Validators.required),
        'description': new FormControl(((this.editMode && recipe) ? recipe.description : null), Validators.required),
        'ingredients': recipeIngredients,
      });
      this.initialRecipeForm = cloneDeep(this.recipeForm);
    });
  }

  onSubmit() {
    if(this.editMode) {
      this.store.dispatch(RecipesActions.updateRecipe({
        index: this.id, 
        newRecipe: this.recipeForm.value
      }));
    } else {
      this.store.dispatch(RecipesActions.addRecipe({
        newRecipe: this.recipeForm.value
      }))
    }
    this.onCancel();
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


