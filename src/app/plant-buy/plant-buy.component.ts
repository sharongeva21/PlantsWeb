import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-plant-buy',
  templateUrl: './plant-buy.component.html',
  styleUrls: ['./plant-buy.component.css']
})
export class PlantBuyComponent implements OnInit {

  plantToBuy!: {} //recive plant to buy from routing parameter in plants-all component 
  
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.plantToBuy = JSON.parse(this.activatedRoute.snapshot.paramMap.get('plantToBuy') || '{}');
    console.log("plant to buy:");
    console.log(this.plantToBuy);
    
  }
  

}
