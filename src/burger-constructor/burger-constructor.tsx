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
			<li className='bragedItem'>
				<img src={drag} className={isLocked ? 'hidden' : ''}></img>
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
		<div className='burgerConstructor pb-12 pt-12'>
			<ul className='myBurger'>{myBurgerItems}</ul>
			<div className='total'>
				<div>
					<span className='text text_type_main-large pr-2'>610</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
