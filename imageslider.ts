import {Component, HostListener, Input, ViewChild} from '@angular/core';
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'mimageslider',
  template: `
    <div class="container-fluid" *ngIf="isVisible">
      <div class="row" *ngIf="sliderType == 'both'">
        <div class="col-md-12">
          <div class="my-2 me-2 float-end type-switch">
            <div (click)="setImgShowStyle()" class="pointer selected-type"
                 [ngStyle]="{'transform': which == 'left'? 'translateX(0)' : 'translateX(100%)', 'background': which == 'left' ? '#383646' : '#444444'}">
              <i class="pt-2 text-white {{which=='left' ? 'fa fa-list' : 'fa fa-table'}}"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div [@imagesliderload] class="slider-container" *ngIf="which == 'left'">
            <div class="image-container">
              <div class="position-absolute ps-3 pt-2 text-white" >{{datalist.indexOf(activeImg)+1}} / {{datalist.length}}</div>
              <i class="fa fa-arrow-left pointer side-arrows left-side" (click)="plusSlides(-1)"></i>
              <span *ngIf="imgcenterer" class="img-centerer"></span>
              <img class="img-box" [@anim]="state" #activeimgchild [src]="activeImg.img" [ngStyle]="{'width': window.innerWidth < 768 ? '100%' : 'unset'}">
              <i  class="fa fa-arrow-right pointer side-arrows right-side" (click)="plusSlides(1)"></i>
              <div class="img-titlebar customscrollbar text-white" *ngIf="activeImg.post" >{{activeImg.post}}</div>
            </div>
          </div>
          <div class="sm-listbar customscrollbar" *ngIf="which == 'left'">
            <div *ngFor="let item of datalist" class="small-imglist" (click)="setActiveImg(item)" >
              <img class="smalllist-img pointer" [ngClass]="{'opacity-50': activeImg['id'] == item['id']}" (click)="setActiveImg(item)" src="{{item.img}}">
            </div>
          </div>
        </div>
      </div>

    <!--imgchooser-->
      <div class="row">
        <div class="col-md-12">
          <div *ngIf="which == 'right' && (sliderType == 'both' || sliderType == 'box')" class="d-none d-md-block mb-5">
            <label class="me-2">PICTURE PER ROW(PPR):</label><a *ngFor="let item of rowArr" class="text-white btn border-solid" [ngClass]="{'rowcntact': item.isActive}" (click)="setImgPerRow(item.index)">{{item.index}}</a>
          </div>

          <div *ngIf="which == 'right'" >
            <div class="customscrollbar" [@photosAnimation]="datalist.length" [ngStyle]="{'height': (window.innerHeight-72) + 'px' }">
              <div class="listbox" *ngFor="let photo of datalist" [ngStyle]="{'width': !itemwid ? '450px' : itemwid+'px'}">
                <img class="w-100 h-100" [src]="photo.img">
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  `,
  styles: [`

    ::ng-deep body {
      background-color: #bbb !important;
    }

    .pointer {
      cursor: pointer !important;
    }

    .type-switch {
      position:relative;
      width:104px;
      height:36px;
      border: 2px solid #665C61;
      display: inline-block;
      z-index: 1;
    }

    .selected-type {
      position:relative;
      width:50px;
      height:32px;
      display: inline-block;
      text-align: center;
      transition: transform .7s, background .7s;
    }

    .slider-container {
      position: relative;
      width: 100%;
      height: calc(800px - 10px);
      border:5px groove darkgray;
    }

    .side-arrows {
      font-size: 2rem;
      position: absolute;
      top: calc(50% - 1rem);
      color: white;
    }

    .left-side {
      left: 0.25rem;
    }

    .right-side {
      right: 0.25rem;
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 100%;
      margin:0;
      background-color: #222;
      text-align: center;
    }

    .img-centerer {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }

    .img-box {
      max-height: 600px;
      vertical-align: middle;
    }

    .small-imglist{
      display: inline-block;
      border: 5px groove darkgray;
      position: relative;
      height: 84px;
      width: 84px;
      border-radius: 10px;
      margin: 0.5rem 0.25rem;
    }

    .smalllist-img{
      width: 100%;
      height: 100%;
    }

    .sm-listbar {
      position: relative;
      width: 100%;
      height: 105px;
      background-color: #555;
      border: 5px groove darkgray;
      border-top: none;
      overflow: auto;
    }

    .img-titlebar {
      position: relative;
      bottom: 70px;
      width: 300px;
      max-height: 70px;
      overflow: auto;
      left: calc(50% - 150px);
      font-family: 'Merienda', cursive;
    }

    .customscrollbar::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    .customscrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    .customscrollbar::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    .customscrollbar::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .listbox:hover{
      transform: scale(1.06);
      z-index: 1;
      border: 4px groove darkgray;
    }

    .listbox:active{
      width: 100% !important;
      height: 100% !important;
      z-index: 1 !important;
      transform: none !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      transition: none !important;
    }

    .listbox{
      cursor: pointer;
      transition: transform .3s ease-in-out, border-width .1s ease-in-out;
      position: relative;
      height: 250px;
      display: inline-block;
    }

    .rowcntact {
      background-color: #5C535C;
    }

  `],
  animations: [
    trigger('anim', [
      transition('in => out', [
        animate('.01s ease-in-out', style({ opacity: 0.1, transform: 'translateX(-100px)' })),
        animate('.2s ease-in-out', style({ opacity: 0.6, transform: 'translateX(100px)' })),
        // animate('.2s ease-in-out', style({ opacity: 0.9, transform: 'translateX(-100px)' })),
        animate('.2s ease-in-out', style({ opacity: 1, transform: 'translateX(0px)' })),
      ]),
      transition('out => in', [
        animate('.01s ease-in-out', style({ opacity: 0.1, transform: 'translateX(-100px)' })),
        animate('.2s ease-in-out', style({ opacity: 0.6, transform: 'translateX(100px)' })),
        // animate('.2s ease-in-out', style({ opacity: 0.9, transform: 'translateX(-100px)' })),
        animate('.2s ease-in-out', style({ opacity: 1, transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('photosAnimation', [
      transition(':enter', [
        // query('img',style({ transform: 'translateX(-100%) rotateY(180deg)'})), //query demek atanmış animasyonun alt çocuklarında verilmiş element var mı diye bakıp aniamsyon verir
        query('div',  [
          style({opacity: 0, transform: 'translateX(-400px)'}), // bu stillden animasyonla alttaki stile gidiyor
          stagger('200ms', [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateX(100px)' })), // -400px den hiçe git
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' })) // -400px den hiçe git
          ])
        ],{ optional: true })
      ])
    ]),
    trigger('imagesliderload', [
      transition(':enter', [
        animate('.01s ease-in-out', style({ opacity: 0.1, transform: 'translateX(-100px)' })),
        animate('.2s ease-in-out', style({ opacity: 0.6, transform: 'translateX(100px)' })),
        // animate('.2s ease-in-out', style({ opacity: 0.9, transform: 'translateX(-100px)' })),
        animate('.2s ease-in-out', style({ opacity: 1, transform: 'translateX(0px)' })),
      ]),
      transition(':leave', [
        animate('.2s ease-in-out', style({ opacity: 0.5, transform: 'translateX(100px)' })),
        animate('.2s ease-in-out', style({ opacity: 0, transform: 'translateX(0px)' })),
      ]),
    ]),
  ]
})


export class MImageSlider {
  @Input() isVisible = true; // görünürlüğü
  @Input() sliderType = "both"; // box-list-both
  @Input() which = "right"; // left or right one visible
  @ViewChild('activeimgchild') activeimgchild:any;
  @Input() datalist = [{id: 1,img: "../assets/Images/ereshkigal.png" , post: "New Show"}];
  activeImg:any ;
  imgcenterer = true;
  state = "in";
  rowArr = [{index: 3, isActive: true},{index: 4, isActive: false},{index: 5, isActive: false},{index: 6, isActive: false}];
  itemwid:any;

  window = window;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(window.innerWidth < 768) {
      this.setImgPerRow(1);
    }
  }

  constructor(){
  }

  ngOnInit(){
  this.activeImg = this.datalist[0];
  if (this.sliderType != 'box') {
    this.which = 'left';
  } else {
    this.which = 'right';
  }
  }


  plusSlides(n:any) {
    this.state = this.state == "in" ? "out" : "in";
    let a = this.datalist.indexOf(this.activeImg);
    if(n == -1){
      if(a == 0 ) {
        this.activeImg = this.datalist[this.datalist.length-1];
      } else {
        this.activeImg = this.datalist[a-1];
      }
    } else if (n == 1) {
      if(a == this.datalist.length-1){
        this.activeImg = this.datalist[0];
      } else {
        this.activeImg = this.datalist[a+1];
      }
    }
    setTimeout(this.onResize.bind(this),1 )
    // this.onResize(window);
  }


  setActiveImg(item:any) {
    let a = this.datalist.indexOf(item);
    this.activeImg = this.datalist[a];
    setTimeout(this.onResize.bind(this),1 )
  }

  setImgPerRow(index:any){
    for(var a = 0; a < this.rowArr.length; a++) {
      if(this.rowArr[a].index == index){
        this.rowArr[a].isActive = true;
        this.itemwid = ((window.innerWidth-43) / index);
      } else {
        this.rowArr[a].isActive = false;
      }
    }
  }

  setImgShowStyle() {
    this.which == "left" ? this.which = "right" : this.which = "left";
    this. which == "right" ? this.setImgPerRow(window.innerWidth < 768 ? 1 : 3) : "" ;
    if(this.which == "left") {
      this.onResize({});
    }
  }

}
