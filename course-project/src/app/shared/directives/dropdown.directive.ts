import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen: boolean = false;
    
    constructor(private elementRef: ElementRef) {}

    // @HostListener('click') toggleDropdown(eventData: Event) {
    //     this.isOpen = !this.isOpen;
    // }
    @HostListener('document:click', ['$event']) toggleDropdown(event: Event) {
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }
}