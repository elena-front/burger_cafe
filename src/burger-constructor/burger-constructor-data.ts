import bun1 from '../burger-ingredients/img/bun-01.png';
import sauce3 from '../burger-ingredients/img/sauce-03.png';
import meat2 from '../burger-ingredients/img/meat-02.png';
import sp from '../burger-ingredients/img/sp.png';
import mineralRings from "../burger-ingredients/img/mineral rings.png";
import { Ingredient } from '../types';

export const myBurger: Ingredient[] = [{
    img: bun1, 
    price: 20,
    name: 'Краторная булка N- 200i'
},{
    img: sauce3, 
    price: 30,
    name: 'Соус традиционный галактический'
},{
    img: meat2,
    price: 300,
    name: 'Мясо бессмертных моллюсков Protostomia'
},{
    img: sp,
    price: 80,
    name: 'Плоды Фалленианского дерева'
},{
    img: mineralRings,
    price: 80,
    name: 'Хрустящие минеральные кольца'
},{
    img: mineralRings,
    price: 80,
    name: 'Хрустящие минеральные кольца'
},{
    img: bun1, 
    price: 20,
    name: 'Краторная булка N- 200i'
}]