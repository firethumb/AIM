import { Component, OnInit } from '@angular/core';
import 'popper.js';
import 'bootstrap';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  pagecssvar:any="container pt-md-5 pb-md-4 text-center"
  constructor() { }

  ngOnInit() {
  }

}
