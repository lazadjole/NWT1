import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs/';

import{Ingredient} from 'src/app/recipes/ingredients.model'


@Injectable()
export class RecipeService
{   
      apiKey:string='cfad1a5b7cd74882a6211a6c7b64efc7';
    apikey2:string='bb6803467a684644abc6d1abcc86bdb0';  
  /*   apiKey:string='fe04f07608434f9abadf9c928ea3a6e7';
    apikey2:string='fe04f07608434f9abadf9c928ea3a6e7'; */
    recipes:Recipe[]=[];
    recipesByNutrients:Recipe[]=[];
    ingredients:Ingredient[]=[];
    recipetotalCost:number;
    recipeNameinput=new Subject<String>();
    ingredientsPrice=new Subject<number>();
    
    price:number;
    
    constructor(private http:HttpClient)
    {}
    gerRandomRecipes()
    {
      return  this.http.get('https://api.spoonacular.com/recipes/random',
      {params:new HttpParams().set('apiKey',this.apiKey).append('number','8')})
      .pipe(
        map(res=>{
          this.recipes=[];
           for(let recipe of Object.values(res["recipes"]))
          { 
            this.ingredients=[]
            for(let ingredient of recipe['extendedIngredients'])
          { 
            this.ingredients.push(new Ingredient(ingredient['name'],ingredient['image'],ingredient['measures']['metric']['amount'],ingredient['measures']['metric']['unitShort'],null))
          }
            this.recipes.push(new Recipe(recipe['id'],recipe['image'],recipe['instructions'],
            recipe['readyInMinutes'],recipe['servings'],recipe['summary'],recipe['title'],recipe['healthScore'],this.ingredients))
          }
          return this.recipes 
        })
      )
    }


    getSearchRecipes(recipeName:string)
    {      
      return  this.http.get('https://api.spoonacular.com/recipes/search',
      {params:new HttpParams().set('apiKey',this.apiKey).append('number','8').append('query',recipeName)})
      .pipe(
        map(res=>{
          this.recipes=[];
            for(let recipe of Object.values(res["results"]))
          { 
           this.getRecipesbyId(recipe['id']).subscribe(
             (recip:Recipe)=>this.recipes.push(recip)
           )
          }
          console.log(this.recipes.length)
          return this.recipes  
        })
      )
    } 
 
    getRecipesbyId(id:number)
    {
      return  this.http.get('https://api.spoonacular.com/recipes/'+id+'/information',
            {params:new HttpParams().set('apiKey',this.apikey2)})
            .pipe(
              map(
                (result)=>
                {   this.ingredients=[];
                  for(let ingredient of result['extendedIngredients'])
                { 
                  this.ingredients.push(new Ingredient(ingredient['name'],ingredient['image'],ingredient['measures']['metric']['amount'],ingredient['measures']['metric']['unitShort'],null))
                }
                return new Recipe(result['id'],result['image'],result['instructions'],
                result['readyInMinutes'],result['servings'],result['summary'],result['title'],result['healthScore'],this.ingredients)
              }

              )
            )       
    }


    gerRecipesBreakdown(id:number)
    {
      return  this.http.get('https://api.spoonacular.com/recipes/'+id+'/priceBreakdownWidget.json',
      {params:new HttpParams().set('apiKey',this.apiKey)})
      .pipe(
        map(response=>{
          let ingredients:Ingredient[]=[]
          for(let ing of response['ingredients']) 
          { this.price=Math.round(+ing['price'])/100;
          
            ingredients.push(new Ingredient(ing['name'],ing['image'],+ing['amount']['metric']['value'],ing['amount']['metric']['unit'],this.price))
          }
          return ingredients
        }
        )
      )
    }

    getRecipesByNutrients(mCarbs:string,mxCarbs:string,mFat:string,mxFat:string,mCholesterol:string,
      mxCholesterol:string,mSaturatedFat:string,mxSaturatedFat:string)
    {
      return  this.http.get('https://api.spoonacular.com/recipes/findByNutrients',
      {params:new HttpParams().set('apiKey',this.apiKey).append('number','8').append('minCarbs',mCarbs).append('maxCarbs',mxCarbs).append('minFat',mFat)
    .append('maxFat',mxFat).append('minCholesterol',mCholesterol).append('maxCholesterol',mxCholesterol).append('minSaturatedFat',mSaturatedFat).append('maxSaturatedFat',mxSaturatedFat)})
      .pipe(
        map(responseNutrients=>{
          this.recipesByNutrients=[];
            for(let recipe of Object.values(responseNutrients))
          { 
            this.getRecipesbyId(recipe['id']).subscribe(
              (recipeID:Recipe)=>this.recipesByNutrients.push(recipeID)
            )
            }
          return this.recipesByNutrients
            }
        )
      )
    }

   

   



}

