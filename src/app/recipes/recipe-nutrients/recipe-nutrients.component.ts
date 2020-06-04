import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-recipe-nutrients',
  templateUrl: './recipe-nutrients.component.html',
  styleUrls: ['./recipe-nutrients.component.css']
})
export class RecipeNutrientsComponent implements OnInit,OnDestroy {
  recipes:Recipe[]=null;
  faCoffee = faSearch;
  num:number=0;
  noRecipes:boolean=false;
  recipesNutritionsSubscription:Subscription;
  constructor(private recipeServic:RecipeService) { }
  
  ngOnInit(): void {
 
  }

  onSubmit(forma:NgForm)
  {
    this.recipesNutritionsSubscription= this.recipeServic.getRecipesByNutrients(forma.value.minCarbs,forma.value.maxCarbs,forma.value.minFat,
      forma.value.maxFat,forma.value.minCholesterol,forma.value.maxCholesterol,
      forma.value.minSaturatedFat,forma.value.maxSaturatedFat).subscribe(
      (response:Recipe[])=>{
        this.recipes=response;
   

       
       /*  if(this.recipes.length==0)
        {
          this.noRecipes=true;
        }
        else
        {
          console.log('!')
          this.noRecipes=false;

        } */
      }
    )
  }

  ngOnDestroy()
  { 
    if(this.recipesNutritionsSubscription!=null)
    {   
      this.recipesNutritionsSubscription.unsubscribe();
    }
    
  }
}
