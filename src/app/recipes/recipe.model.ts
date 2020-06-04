import{Ingredient} from 'src/app/recipes/ingredients.model'

export class Recipe
{
    id:number;
    imagePath:string;
    instructions:string;
    redyInMinute:number;
    serving:number;
    sumary:string;
    title:string;
    healthScore:number;
    ingredients:Ingredient[];    



    constructor(id:number,imgPath:string,instr:string,redyMinut:number,serving:number,sumary:string,title:string,hScore:number,ingerd:Ingredient[])
    {
        this.id=id;
        this.imagePath=imgPath;
        this.instructions=instr;
        this.redyInMinute=redyMinut;
        this.serving=serving;
        this.sumary=sumary;
        this.title=title;
        this.healthScore=hScore;
        this.ingredients=ingerd;
    }
}