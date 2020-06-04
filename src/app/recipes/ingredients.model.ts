export class Ingredient
{
    name:string;
    image:string;
    amount:number;
    unit:string;
    price:number;

    constructor(name:string,image:string,amonut:number,unit:string, price:number)
    {
        this.name=name;
        this.image=image;
        this.amount=amonut;
        this.unit=unit;
        this.price=price;
    }

}