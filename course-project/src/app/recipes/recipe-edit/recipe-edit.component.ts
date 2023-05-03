import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
      }
    );
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null),
      'description': new FormControl(null, Validators.required),
      'ingredients': new FormArray([]),
    });
  }

  onSubmit() {

  }

  onAddIngredient() {

  }
}
