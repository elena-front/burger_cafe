import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../types';
import { myBurger } from './burger-constructor-data';
import './burger-constructor.css';
import drag from './img/drag.svg';

type BurgerConstructorProps = {
	items?: Ingredient[];
};

export const BurgerConstructor = ({
	items = myBurger,
}: BurgerConstructorProps) => {
	const myBurgerItems = items.map((item, index) => {
		const isFirst = index === 0;
		const isLast = index === items.length - 1;
		const isLocked = isFirst || isLast;
		return (
			<li key={index} className='constructorItem'>
				<div className='dragIcon'>{!isLocked && <img src={drag}></img>}</div>
				<ConstructorElement
					type={isFirst ? 'top' : isLast ? 'bottom' : undefined}
					isLocked={isLocked}
					text={item.name}
					price={item.price}
					thumbnail={item.img}
				/>
			</li>
		);
	});

	return (
		<div className='burgerConstructor'>
			<ul className='myBurger custom-scroll'>{myBurgerItems}</ul>
			<div className='footer'>
				<div className='total'>
					<span className='text text_type_main-large pr-2'>610</span>
					<CurrencyIcon type='primary' className='currencyIcon' />
				</div>
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
