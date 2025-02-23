import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './app-header.css';

const AppHeader = () => {
	return (
		<div className='appHeader pb-4 pt-4'>
			<div className='appHeader__left'>
				<div className='appHeader__item'>
					<BurgerIcon type='primary' className='' />
					<span className='text text_type_main-default'>Конструктор</span>
				</div>

				<div className='appHeader__item'>
					<ListIcon type='secondary' className='' />
					<span className='text text_type_main-default text_color_inactive'>
						Лента заказов
					</span>
				</div>
			</div>

			<Logo />

			<div className='appHeader__right'>
				<div className='appHeader__item'>
					<ProfileIcon type='secondary' className='' />
					<span className='text text_type_main-default text_color_inactive '>
						Личный кабинет
					</span>
				</div>
			</div>
		</div>
	);
};

export default AppHeader;
