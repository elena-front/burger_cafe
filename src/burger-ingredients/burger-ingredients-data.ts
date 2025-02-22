import bun1 from './img/bun-01.png';
import bun2 from './img/bun-02.png';
import sauce1 from './img/sauce-01.png';
import sauce2 from './img/sauce-02.png';
import sauce3 from './img/sauce-03.png';
import sauce4 from './img/sauce-04.png';
import meat1 from './img/meat-01.png';
import meat2 from './img/meat-02.png';
import meat3 from './img/meat-03.png';
import meat4 from './img/meat-04.png';
import cheese from './img/cheese.png';
import salad from './img/salad.png';
import sp from './img/sp.png';
import mineralRings from "./img/mineral rings.png";
import { Ingredient } from '../types';


export const itemsBread: Ingredient[] = [{
    img: bun1, 
    price: 20,
    name: 'Краторная булка N- 200i'
}, {
    img: bun2, 
    price: 20,
    name: 'Флуоресцентная булка К2 - В3'
}];

export const itemsSause: Ingredient[] = [{
    img: sauce2, 
    price: 30,
    name: 'Соус Spicy-X'
}, {
    img: sauce4, 
    price: 30,
    name: 'Соус фирменный Space Sause'
},{
    img: sauce3, 
    price: 30,
    name: 'Соус традиционный галактический'
}, {
    img: sauce1, 
    price: 30,
    name: "Соус с шипами Антарианского плоскоходца"

}];

export const itemsFilling: Ingredient[] = [{
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
    img: meat3,
    price: 300,
    name: "Филе Люминесцентного тетраодонтимформа"
},{
    img: meat4,
    price: 300,
    name: "Говяжий метеорит (отбивная)"
},{
    img: meat1,
    price: 300,
    name: "Биокотлета из марсианской Магнолии"
},{
    img: mineralRings,
    price: 80,
    name: "Кристаллы марсианских альфа-сахаридов"

},{
    img: salad,
    price: 80,
    name: "Мини-салат Экзо-Плантаго"

},{
    img: cheese,
    price: 80,
    name: "Сыр с астероидной плесенью"

}];