import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  @Input() recipes:Recipe[]=[];
  noRecipes:boolean=false;
  pom:number=0;
  @Input() isLoad:boolean=false;

  faCoffee = faSearch;
  constructor(private recipeService:RecipeService,
              private activeRoute:ActivatedRoute) { }
  recipeNameSubscription:Subscription;
  getRandomRecipSubscription:Subscription=null;
  ngOnInit(): void {

      this.activeRoute.url.subscribe(
        res=>{ if((res.filter(x=>x['path']=='nutrients').length==0) && (res.filter(x=>x['path']=='meal-plan').length==0) )
        {
          this.getRandomRecipSubscription=this.recipeService.gerRandomRecipes().subscribe(
            (result:Recipe[])=>{
              this.isLoad=true;
              this.recipes=result;
              if(this.recipes.length==0)
              {
                this.noRecipes=true
              }
              else
              {
                this.noRecipes=false
              }
            }  
          ) 
        }
      }
      ) 

    this.recipeNameSubscription=this.recipeService.recipeNameinput.subscribe(
      (recipeInput:string)=>
      {   this.isLoad=false;
        this.recipeService.getSearchRecipes(recipeInput).subscribe(
          (result:Recipe[])=>{
            this.isLoad=true;
             this.recipes=result;
             console.log(this.recipes.length)
            
          
            }
        )
      }
    ) 
       
  }
  ngOnDestroy()
  {
    this.activeRoute.url.subscribe(
      res=>{ if(res.filter(x=>x['path']=='nutrients').length==0)
      {
        this.getRandomRecipSubscription.unsubscribe();

      }
    }
    )
    this.recipeNameSubscription.unsubscribe();
  }

}
