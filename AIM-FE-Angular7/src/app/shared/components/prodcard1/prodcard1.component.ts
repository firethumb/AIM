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
      objid:"id1",
      imgsrc:["assets/product-picks/1.jpg","assets/product-picks/2.jpg"],
      ctitle:"Card Title 1",
      desc:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      price:"100php",
      features:[],
      link:"default/product/id1a",
      detials:""
    },
    {
      objid:"id2",
      imgsrc:["assets/product-picks/3.jpg","assets/product-picks/1.jpg"],
      ctitle:"Card Title 2",
      desc:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      price:"200php",
      features:[],
      link:"default/product/id2",
      detials:""
    },
    {
      objid:"id3",
      imgsrc:["assets/product-picks/3.jpg","assets/product-picks/3.jpg"],
      ctitle:"Card Title 1",
      desc:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      price:"300php",
      features:[],
      link:"default/product/id3",
      detials:""
    },
    {
      objid:"id4",
      imgsrc:["assets/product-picks/3.jpg","assets/product-picks/1.jpg"],
      ctitle:"Card Title 2",
      desc:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      price:"400php",
      features:[],
      link:"default/product/id4",
      detials:""
    },
    {
      objid:"id5",
      imgsrc:["assets/product-picks/1.jpg","assets/product-picks/2.jpg"],
      ctitle:"Card Title 1",
      desc:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      price:"500php",
      features:[],
      link:"default/product/id5",
      detials:""
    }
  ];
  ngOnInit() {
    let tmp:any=[];
    for (let j=0;j<this.pdata.length;){
      tmp = [];
      for (let i=1;i<=this.pconfig.column;i++){
        tmp.push(this.pdata[j])
        j++;
      }
      this.rowarry.push(tmp)
    }
  }

}
