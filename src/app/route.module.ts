import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeNutrientsComponent } from './recipes/recipe-nutrients/recipe-nutrients.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { AuthGuard } from './authorization/auth-guard.service';
import { OrderIngredientComponent } from './recipes/order-ingredient/order-ingredient.component';
import { SigninComponent } from './authorization/signin/signin.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { NotFoundComponent } from './shered/not-found/not-found.component';

const routes:Route[]=
[
  {path:'',redirectTo:'recipes',pathMatch:'full'},
  {path:'recipes',component:RecipesComponent,pathMatch:'full'},
  {path:'recipes/nutrients',component:RecipeNutrientsComponent,pathMatch:'full'},
  {path:'recipes/:id',component:RecipeDetailComponent, canActivate:[AuthGuard]},
  {path:'recipes/:id/oreder-ingredient',component:OrderIngredientComponent, canActivate:[AuthGuard]},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'meal-plan',component:MealPlanComponent, canActivate:[AuthGuard]},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',redirectTo:'/not-found'}
  
]

@NgModule(
    {
        imports:[RouterModule.forRoot(routes)],
        exports:[RouterModule]

        
    }
)


export class AppRouteModule 
{

}