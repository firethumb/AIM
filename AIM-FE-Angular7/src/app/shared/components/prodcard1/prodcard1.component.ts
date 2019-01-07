import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prodcard1',
  templateUrl: './prodcard1.component.html',
  styleUrls: ['./prodcard1.component.scss']
})
export class Prodcard1Component implements OnInit {
  constructor() { }
  rowarry:any=[];
  pconfig:any = {column:2};
  pdata:any = [
    {
      imgsrc:["assets/product-picks/1.jpg","assets/product-picks/2.jpg"],
      ctitle:"Card Title 1",
      desc:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      price:"100php",
      features:[],
      link:"default/product/id1a",
      detials:""
    },
    {
      imgsrc:["assets/product-picks/3.jpg","assets/product-picks/1.jpg"],
      ctitle:"Card Title 2",
      desc:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      price:"200php",
      features:[],
      link:"default/product/id2",
      detials:""
    }];
  ngOnInit() {
    let tmp:any=[];
    for (let j=0;j<this.pdata.length;j++){
      for (let i=1;i<=this.pconfig.column;i++){
        tmp.push(this.pdata[j])
        console.log("i : ",i);
        j++;
      }
    }
    console.log("tmp: ",tmp);
    this.rowarry=[tmp];
  }

}
