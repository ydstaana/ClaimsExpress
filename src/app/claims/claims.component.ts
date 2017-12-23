import { Component, OnInit } from '@angular/core';
import { Claim } from '../shared/models/claim';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
	title:	string ='Claims';
	claims = Claim[];
	constructor() { }

	ngOnInit() {
		this.claims = [
			new Claim
			]
	}

}
