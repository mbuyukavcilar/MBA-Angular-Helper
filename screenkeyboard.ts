import {Component, EventEmitter, Input, Output} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'keyboard-comp',
  template: `
    <table [@fadeInOut] *ngIf="isVisible" class="keyboard">
      <tr>
        <td class="keyboard-header" colspan="2" style="">Custom Keyboard<i (click)="closeKeyboard()" class="fa fa-times text-danger me-2 mt-1 float-end pointer"></i></td>
      </tr>
      <tr>
        <td>
          <div class="buttons-content">
            <div>
              <input type="button" value="{{type}}" *ngFor="let type of keyboardSpecialTop"
               (click)="typeKey($event)" >
            </div>
          <div>
            <input type="button" value="{{type}}" *ngFor="let type of keyboardSpecialBot"
               (click)="typeKey($event)" >
          </div>
          <div>
            <input type="button" value="{{type}}" *ngFor="let type of keyboardTop"
               (click)="typeKey($event)" >
          </div>
          <div>
            <input type="button" value="{{type}}" *ngFor="let type of keyboardMid"
               (click)="typeKey($event)" >
          </div>
          <div>
            <input type="button" value="{{type}}" *ngFor="let type of keyboardBot"
               (click)="typeKey($event)" >
          </div>
          <div>
            <input type="button" value="Space" (click)="typeKey($event)">
            <input type="button" value="Delete All" (click)="typeKey($event)" >
            <input type="button" value="Backspace" (click)="typeKey($event)">
            <input type="button" value="OK" (click)="typeKey($event)" >
            <input type="button" value="Caps" (click)="typeKey($event)" >
            <input type="button" value=" "  style="min-width: 62.73px;">
          </div>
        </div>
        </td>
        <td>
    <div class="numeric-content">
      <div><input type="button" class="numeric-part" value="{{type}}" *ngFor="let type of numKeyboardTop"
             (click)="typeKey($event)" ></div>
      <div><input type="button" class="numeric-part" value="{{type}}" *ngFor="let type of numKeyboardMid"
             (click)="typeKey($event)" ></div>
      <div><input type="button" class="numeric-part" value="{{type}}" *ngFor="let type of numKeyboardBot"
             (click)="typeKey($event)" ></div>
      <div><input type="button" class="numeric-part" value="{{type}}" *ngFor="let type of numKeyboardCell"
             (click)="typeKey($event)" ></div>
    </div>
        </td>
      </tr>
    </table>
    <i class="fa fa-keyboard border p-2 text-muted pointer" (click)="toogleKeyboard()"></i>
  `,
  animations: [trigger('fadeInOut', [  // ngif e bagli animasyon
    state('*', style({
      opacity: "1",
    })),
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(500, style({opacity:1}))
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(500, style({opacity:0}))
    ])
  ])],
  styles: [`
    .keyboard-header {
      background-color: #665C61;
      border: 5px groove gray;
      text-align: center;
      font-family: 'Merienda', cursive;
      color: whitesmoke;
      font-size: 12pt;
    }

    .keyboard {
      position: fixed;
      bottom: 0;
      left: calc( 50% - 432px );
      z-index: 1000;
    }

    .buttons-content {
      text-align: center;
      width: 410px;
      height: 250px;
      background-color: darkgray;
      border: 5px groove gray;
    }

    input[type='button'] {
      color: white;
      background-color: #665C61;
      min-height: 40px;
      min-width: 40px;
    }

    input[type='button']:hover {
      background-color: lighten(#665C61, 10%);
    }

    input[type='button'].numeric-part {
      color: white;
      background-color: #665C61;
      min-height: 60px;
      min-width: 60px;
    }

    input[type='button'].numeric-part:hover {
      background-color: lighten(#665C61, 10%);
    }

    .numeric-content {
      width: 190px;
      height: 250px;
      background-color: #1b6d85;
      border: 5px groove gray;
    }
  `]
})
export class MKeyboard {

  keyboardSpecialTop = [".",",",":",";","\"","\\","!","'","^","+"];
  keyboardSpecialBot = ["%","&","/","(",")","=","?","*","-","_"];

  keyboardTop = ["q","w","e","r","t","y","u","ı","o","p"];
  keyboardTopTr = ["q","w","e","r","t","y","u","ı","o","p","ğ","ü"];

  keyboardMid = ["a","s","d","f","g","h","j","k","l",","];
  keyboardMidTr = ["a","s","d","f","g","h","j","k","l","ş","i",","];

  keyboardBot = ["z","x","c","v","b","n","m","~"];
  keyboardBotTr = ["z","x","c","v","b","n","m","ö","ç"];

  skeyboardTop = ["q","w","e","r","t","y","u","i","o","p"];
  skeyboardTopTr = ["q","w","e","r","t","y","u","ı","o","p","ğ","ü"];

  skeyboardMid = ["a","s","d","f","g","h","j","k","l",","];
  skeyboardMidTr = ["a","s","d","f","g","h","j","k","l","ş","i",","];

  skeyboardBot = ["z","x","c","v","b","n","m","~"];
  skeyboardBotTr = ["z","x","c","v","b","n","m","ö","ç"];

  lkeyboardTop = ["Q","W","E","R","T","Y","U","I","O","P"];
  lkeyboardTopTr = ["Q","W","E","R","T","Y","U","I","O","P","Ğ","Ü"];

  lkeyboardMid = ["A","S","D","F","G","H","J","K","L",","];
  lkeyboardMidTr = ["A","S","D","F","G","H","J","K","L","Ş","İ",","];

  lkeyboardBot = ["Z","X","C","V","B","N","M","~"];
  lkeyboardBotTr = ["Z","X","C","V","B","N","M","Ö","Ç"];

  numKeyboardTop = [1,2,3];
  numKeyboardMid = [4,5,6];
  numKeyboardBot = [7,8,9];
  numKeyboardCell = ["Clean",0,"OK"];
  targetError = "Please click an input that you want to write."
  Capsed=false;
  isVisible = false;
  @Input() inputTarget: any;
  @Output() onkeyboardsubmit: EventEmitter<any> = new EventEmitter();
  @Output() onkeyboardclose: EventEmitter<any> = new EventEmitter();

  constructor(){
  }

  typeKey(e:any){
    var key = e.target.value;
    if(this.inputTarget){
      switch(key) {
        case "Delete All":{
          this.inputTarget.value = "";
          break;
        }
        case "Backspace":{
          this.inputTarget.value = this.inputTarget.value.slice(0,-1);
          break;
        }
        case "Space":{
          this.inputTarget.value += " ";
          break;
        }
        case "Clean":{
          this.inputTarget.value = "";
          break;
        }
        case "OK":{
          this.onkeyboardsubmit.emit(this);
          break;
        }
        case "Caps": {
          this.Capsed = !this.Capsed;
          if(!this.Capsed) {
            this.keyboardBot = this.skeyboardBot;
            this.keyboardMid = this.skeyboardMid;
            this.keyboardTop = this.skeyboardTop;
            e.target.style.backgroundColor = "#665C61";
          } else {
            this.keyboardBot = this.lkeyboardBot;
            this.keyboardMid = this.lkeyboardMid;
            this.keyboardTop = this.lkeyboardTop;
            e.target.style.backgroundColor = "darkgrey";
          }
          break;
        }
        default: {
          this.inputTarget.value += e.target.value;
          break;
        }
      }
    } else {
      alert(this.targetError);
    }
  }

  closeKeyboard(){
    this.isVisible = false;
    this.onkeyboardclose.emit(this);
  }

  toogleKeyboard() {
    this.isVisible = !this.isVisible;
  }


}
