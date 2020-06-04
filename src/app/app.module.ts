import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeComponent } from './recipes/recipe-list/recipe/recipe.component';
import { HeaderComponent } from './header/header.component';
import { RecipeSearchComponent } from './recipes/recipe-search/recipe-search.component';
import { RecipeService } from './recipes/recipe.service';
import{ HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { SigninComponent } from './authorization/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './authorization/signup/signup.component';
import { AuthService } from './authorization/auth.service';
import { AuthGuard } from './authorization/auth-guard.service';
import { RecipeNutrientsComponent } from './recipes/recipe-nutrients/recipe-nutrients.component';
import { NotFoundComponent } from './shered/not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OrderIngredientComponent } from './recipes/order-ingredient/order-ingredient.component';
import { AppRouteModule } from './route.module';




@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeComponent,
    HeaderComponent,
    RecipeSearchComponent,
    SigninComponent,
    SignupComponent,
    RecipeNutrientsComponent,
    MealPlanComponent,
    OrderIngredientComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AppRouteModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatProgressSpinnerModule
    
  ],
  providers: [RecipeService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
