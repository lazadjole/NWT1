import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { AuthService } from 'src/app/authorization/auth.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit,DoCheck {
  @Input() recipe:Recipe;
  data:SafeHtml;
  closeResult = '';
  isAuth:boolean;
  constructor(private sanitizer:DomSanitizer,
              private modalService: NgbModal,
              private router:Router,
              private activeLink:ActivatedRoute,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.data = this.sanitizer.bypassSecurityTrustHtml(this.recipe.sumary); 
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  
  }
  ngDoCheck()
  {
    this.isAuth=this.authService.isAuthenticated();
  }



    onRecipDetail()
    { 
  
      this.modalService.dismissAll('Save click');
      this.activeLink.url.subscribe(
        res=>{ 
        if((res.filter(x=>x['path']=='nutrients').length==0) && (res.filter(x=>x['path']=='meal-plan').length==0) )
        {
          this.router.navigate([this.recipe.id],{relativeTo:this.activeLink});
        }
        else
        {
          this.router.navigate(['/recipes/'+this.recipe.id]);
        }
      }
      )
     
    }
}
