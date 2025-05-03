import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { ComponentType } from 'react';

type HeaderItemProps = {
	readonly to: string;
	readonly active: boolean;
	readonly text: string;
};

function toHeaderItem(IconComponent: ComponentType<TIconProps>) {
	return (props: HeaderItemProps) => {
		const { to, active, text } = props;
		return (
			<Link to={to} className={styles.appHeaderItem} discover='none'>
				<IconComponent type={active ? 'primary' : 'secondary'} />
				<div
					className={
						'text text_type_main-default ' +
						(active ? 'text_color_primary' : 'text_color_inactive')
					}>
					{text}
				</div>
			</Link>
		);
	};
}

const AppHeader = () => {
	const location = useLocation();

	const BurgerItem = toHeaderItem(BurgerIcon);
	const FeedItem = toHeaderItem(ListIcon);
	const ProfileItem = toHeaderItem(ProfileIcon);

	return (
		<header className={styles.appHeader + ' pb-4 pt-4'}>
			<div className={styles.items}>
				<div className={styles.appHeaderLeft}>
					<BurgerItem
						to='/'
						active={location.pathname === '/'}
						text='Конструктор'
					/>
					<FeedItem
						to='/feed'
						active={location.pathname.startsWith('/feed')}
						text='Лента заказов'
					/>
				</div>

				<Link to='/'>
					<Logo />
				</Link>

				<div className={styles.appHeaderRight}>
					<ProfileItem
						to='/profile'
						active={location.pathname.startsWith('/profile')}
						text='Личный кабинет'
					/>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
