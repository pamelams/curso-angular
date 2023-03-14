import { Injectable, OnInit } from "@angular/core";

 
@Injectable({providedIn: 'root'})
export class CounterService implements OnInit {
    activeToInactive: number = 0;
    inactiveToActive: number = 0;

    ngOnInit() {
        this.activeToInactive = 0;
        this.inactiveToActive = 0;
    }

    countSetInactive() {
        this.activeToInactive += 1;
        console.log("active->inactive actions:", this.activeToInactive);
    }
    countSetActive() {
        this.inactiveToActive += 1;
        console.log("inactive->active actions:", this.inactiveToActive);
    }
}