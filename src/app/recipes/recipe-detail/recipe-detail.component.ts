import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../ingredients.model';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  
  recipeDetail:Recipe=null;
  ingredients:Ingredient[]=[];
  numbers=[1,2,3,4,5];
  ruterSubsribtion:Subscription;
  data:SafeHtml;
  data1:SafeHtml;
  recipeCostSum:number=0;
  constructor(private recipeservice:RecipeService,
              private routerA:ActivatedRoute,
              private sanitizer:DomSanitizer,
              private router:Router) { }

  ngOnInit(): void {
        
    this.ruterSubsribtion= this.routerA.params.subscribe(
        (params:Params)=>
        { 
          this.recipeservice.getRecipesbyId(params['id']).subscribe
          (
            (recipe:Recipe)=>{
              this.recipeDetail=recipe;
              this.data = this.sanitizer.bypassSecurityTrustHtml(this.recipeDetail.instructions); 
            }
          );

          this.recipeservice.gerRecipesBreakdown(params['id']).subscribe(
            (response:Ingredient[])=>
            { this.data1=""
              let str:string='<ul>'
             for(let i of response)
             {this.recipeCostSum+=i['price'];
              str+='<li><img src="https://spoonacular.com/cdn/ingredients_100x100/'+i['image']+'" alt="error">  '
              +i['name']+',<strong> amount: </strong>'+i['amount']+ ' <strong>'+i['unit']
              +'</strong>, <span class="text-danger font-italic font-weight-bold ">Price:' +i['price'] +'$</span>' +'</li>'
             }
             str+='</ul>'
             this.data1 = this.sanitizer.bypassSecurityTrustHtml(str); 
            }
          )

        }

      )
      }

      onOrder()
      { 
        this.recipeservice.ingredientsPrice.next(this.recipeCostSum);
        this.router.navigate(['oreder-ingredient'],{relativeTo:this.routerA,queryParams:{'price':this.recipeCostSum}});
        
      }


    ngOnDestroy()
    {
      this.ruterSubsribtion.unsubscribe();
    }

  }


