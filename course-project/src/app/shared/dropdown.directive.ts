import { Directive, ElementRef, HostBinding, HostListener, OnInit, Input } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen: boolean = false;
    
    constructor(private elementRef: ElementRef) {}

    @HostListener('click') openDropdown(eventData: Event) {
        this.isOpen = !this.isOpen;
    }
        
}