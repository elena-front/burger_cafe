import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link } from 'react-router-dom';

const AppHeader = () => {
	return (
		<header className={styles.appHeader + ' pb-4 pt-4'}>
			<div className={styles.appHeaderLeft}>
				<Link to='/' className={styles.appHeaderItem}>
					<BurgerIcon type='primary' />
					<span className='text text_type_main-default'>Конструктор</span>
				</Link>

				<div className={styles.appHeaderItem}>
					<ListIcon type='secondary' />
					<span className='text text_type_main-default text_color_inactive'>
						Лента заказов
					</span>
				</div>
			</div>

			<Logo />

			<div className={styles.appHeaderRight}>
				<Link to='/profile' className={styles.appHeaderItem}>
					<ProfileIcon type='secondary' />
					<div className='text text_type_main-default text_color_inactive '>
						Личный кабинет
					</div>
				</Link>
			</div>
		</header>
	);
};

export default AppHeader;
