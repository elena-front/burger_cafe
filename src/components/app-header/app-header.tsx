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
			<div className='appHeaderLeft'>
				<div className='appHeaderItem'>
					<BurgerIcon type='primary' />
					<span className='text text_type_main-default'>Конструктор</span>
				</div>

				<div className='appHeaderItem'>
					<ListIcon type='secondary' />
					<span className='text text_type_main-default text_color_inactive'>
						Лента заказов
					</span>
				</div>
			</div>

			<Logo />

			<div className='appHeaderRight'>
				<div className='appHeaderItem'>
					<ProfileIcon type='secondary' />
					<span className='text text_type_main-default text_color_inactive '>
						Личный кабинет
					</span>
				</div>
			</div>
		</div>
	);
};

export default AppHeader;
