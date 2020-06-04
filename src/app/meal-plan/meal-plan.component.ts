import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { Nutrients } from './nutrients.model';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  apiKey:string='fe04f07608434f9abadf9c928ea3a6e7';
  params:HttpParams;
  recipes:Recipe[]=[];
  nutritien;
  mealPlane:boolean=false;
  getMealPlaneSubs:Subscription
  constructor(private modalService: NgbModal,
              private http:HttpClient,
              private recipeService:RecipeService) {}
  
  ngOnInit(): void {
    
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }


  onSubmit(f:NgForm)
  {   

 
    if(f.value.checkDiet)
    {
      this.params=new HttpParams().set('apiKey',this.apiKey).append('timeFrame','day').append('diet',f.value.diet).append('targetCalories',f.value.targetCalories);
    } 
    else
    {
      this.params=new HttpParams().set('apiKey',this.apiKey).append('timeFrame','day').append('targetCalories',f.value.targetCalories);
    }
    
    this.getMealPlaneSubs= this.http.get('https://api.spoonacular.com/mealplanner/generate',
      {params:this.params})
      .subscribe
      (res=>
          {  this.recipes=[];

            for(let recipe of res['meals'] )
            {
              this.recipeService.getRecipesbyId(recipe['id']).subscribe(
                (recipe:Recipe)=>
                {this.recipes.push(recipe)}
                )
            }
          this.nutritien=res['nutrients'];
          this.mealPlane=true;
        }
      )
      
  }

}
