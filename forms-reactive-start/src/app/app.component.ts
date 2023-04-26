import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), // bind(this) passa o this atual para a função
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male', {nonNullable: true}),
      'hobbies': new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // );
    // this.signupForm.statusChanges.subscribe(
    //   (status) => {
    //     console.log(status);
    //   }
    // );
    this.signupForm.setValue({ // atualiza o formulário inteiro
      'userData': {
        'username': 'Pamela',
        'email': 'pamela@test.com'
      },
      'gender': 'female',
      'hobbies': []
    });
    this.signupForm.patchValue({  // atualiza apenas alguns valores do formulário
      'userData': {
        'username': 'Anna',
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null; // quando válido devemos passar nada, ou null
  }
  // forbiddenNames = (control: FormControl): {[s: string]: boolean} => { // usando arrow function o bind(this) nãoé necessário
  //   if(this.forbiddenUsernames.indexOf(control.value)) {
  //     return {'nameIsForbidden': true};
  //   }
  //   return null; 
  // }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailisForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
