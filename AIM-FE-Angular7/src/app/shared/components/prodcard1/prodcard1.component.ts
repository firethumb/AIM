import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prodcard1',
  templateUrl: './prodcard1.component.html',
  styleUrls: ['./prodcard1.component.scss']
})
export class Prodcard1Component implements OnInit {
  constructor() { }
  pconfig:any = [];
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
      imgsrc:[],
      ctitle:"Card Title 2",
      desc:"asdf",
      price:"200php",
      features:[],
      detials:""
    }];
  ngOnInit() {
  }

}
