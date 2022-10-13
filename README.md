# MBA-Angular-Helper
Angular Components

# 1. Image Slider
<mimageslider [datalist]="sliderdatalist" [sliderType]="'both'"></mimageslider>

imageslider.ts

# 2. Screen Keyboard
<input class="form-control" (click)="selectElement($event)" #textbox>
/*
selectElement(event: any) {
    this.selectedElement =  event.target;
  } // assign input element
*/
<keyboard-comp [inputTarget]="selectedElement" (onkeyboardsubmit)="triggerKeyboard($event)"></keyboard-comp>
screenkeyboard.ts


