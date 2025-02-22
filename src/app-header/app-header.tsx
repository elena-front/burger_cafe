import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './app-header.css';

const AppHeader = () => {
	return (
		<div className='appHeader'>
			<div className='appHeaderLeft'>
				<div className='pl-5 pr-5 mt-4 mb-4 itemFlex'>
					<BurgerIcon type='primary' className='pr-2' />
					<span className='text text_type_main-small'>Конструктор</span>
				</div>

				<div className='pl-5 pr-5 pb-4 pt-4 itemFlex'>
					<ListIcon type='secondary' className=' pr-2' />
					<span className='text text_type_main-default text_color_inactive'>
						Лента заказов
					</span>
				</div>
			</div>

			<Logo />

			<div className='pl-5 pr-5 pb-4 pt-4 itemFlex'>
				<ProfileIcon type='secondary' className='pr-2' />
				<span className='text text_type_main-default text_color_inactive '>
					Личный кабинет
				</span>
			</div>
		</div>
	);
};

export default AppHeader;
