import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-ingredient',
  templateUrl: './order-ingredient.component.html',
  styleUrls: ['./order-ingredient.component.css']
})
export class OrderIngredientComponent implements OnInit {

  ingredientsSum:number=0;
  isOrdered:boolean;
  model: NgbDateStruct;
  firstName:string;
  lastName:string;
  adress:string;
  data;
  constructor(private recipService:RecipeService,
    private routeA:ActivatedRoute) { }

  ngOnInit(): void {
    this.routeA.queryParams.subscribe(
    (param:Params)=>{
      this.ingredientsSum= Math.round(param['price']*100)/100 
      
    }
    )
    
  }

  onSubmit()
  { 
    this.isOrdered=true;

  }
}
