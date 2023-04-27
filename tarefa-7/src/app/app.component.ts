import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tarefa-7';
  signupForm!: FormGroup;
  status = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'projectData': new FormGroup({
        'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'projectStatus': new FormControl('Stable', {nonNullable: true}),
      }),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.signupForm.reset();

  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if(control.value === 'Test') {
      return {'nameisForbidden': true};
    }
    return null;
  }
}
