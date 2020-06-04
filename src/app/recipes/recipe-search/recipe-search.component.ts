import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {

  faFileAlt = faFileAlt;

  constructor(private recipeServiec:RecipeService) {}
  ngOnInit(): void {
  }


  onSearchRecipe(recipeInput:HTMLInputElement)
  {
    this.recipeServiec.recipeNameinput.next(recipeInput.value);
  }

}
