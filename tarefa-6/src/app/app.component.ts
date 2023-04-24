import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tarefa-6';
  defaultSubscription: string = 'advanced';
  @ViewChild('f') signupForm!: NgForm;

  onSubmit() {
    console.log(this.signupForm.value);
    this.signupForm.reset({subscription: 'advanced'});
  }
}
