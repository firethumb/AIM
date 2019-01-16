import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pdetails',
  templateUrl: './pdetails.component.html',
  styleUrls: ['./pdetails.component.scss']
})
export class PdetailsComponent implements OnInit {
  id:string="1";
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('this.route.snapshot ',this.route.snapshot.params.id)
    this.id = this.route.snapshot.params.id || '/';
  }

}
