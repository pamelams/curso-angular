import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "../shared/services/auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;

    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
        const email: string = form.value.email;
        const password: string = form.value.password;
        
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;

        if(this.isLoginMode) {
            authObs = this.authService.login(email, password);
        }
        else {
            authObs = this.authService.signUp(email, password);
        }  

        authObs.subscribe(respData => {
            console.log(respData);
            this.isLoading = false;
            this.router.navigate(['recipes'], { relativeTo: null });
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
        });

        form.reset();
    }

    onHandleError() {
        this.error = '';
    }
}