import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { ChangeEvent, useCallback } from 'react';
import styles from './profile.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { UpdateUserInfoRequest, User } from '../../types';
import { shallowEqual } from 'react-redux';
import { useAuth } from '../../services/auth';
import { updateUserInfo } from '../../services/actions';

export function Profile() {
	const user = useAppSelector<User | null>((store) => store.user, shallowEqual);

	const [name, setName] = React.useState(user?.login || '');
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const [email, setEmail] = React.useState(user?.email || '');
	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const [password, setPassword] = React.useState('');
	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const dispatch = useAppDispatch();
	const { signOut } = useAuth(dispatch);
	const navigate = useNavigate();

	const handleClick = useCallback(() => {
		signOut().then(() => navigate('/login'));
	}, []);

	const handleCancelClick = useCallback(() => {
		setName(user?.login || '');
		setEmail(user?.email || '');
		setPassword('');
	}, []);

	const handleSaveClick = useCallback(() => {
		const update: UpdateUserInfoRequest = {};
		if (user?.login || '' !== name) {
			update.name = name;
		}
		if (user?.email || '' !== email) {
			update.email = email;
		}
		if (password) {
			update.password = password;
		}
		dispatch(updateUserInfo(update));
	}, []);

	return (
		<div className={styles.profilePage}>
			<div className={styles.navigation}>
				<div className={styles.bar}>
					<Link
						to='/profile'
						className={`text text_type_main-medium ${styles.barItem}`}>
						Профиль
					</Link>
					<Link
						to='/profile/orders'
						className={`text text_type_main-medium text_color_inactive ${styles.barItem}`}>
						История заказов
					</Link>
					<div
						className={`text text_type_main-medium text_color_inactive ${styles.barItem}`}
						onClick={handleClick}>
						Выход
					</div>
				</div>

				<div className='text text_type_main-default text_color_inactive mt-20'>
					В этом разделе вы можете изменить свои персональные данные
				</div>
			</div>

			<div className={styles.inputs}>
				<Input
					onChange={onChangeName}
					value={name}
					name={'name'}
					placeholder='Имя'
					icon='EditIcon'
					extraClass='mb-2'
				/>

				<EmailInput
					onChange={onChangeEmail}
					value={email}
					name={'email'}
					placeholder='Логин'
					isIcon={true}
					extraClass='mb-2'
				/>

				<PasswordInput
					onChange={onChangePassword}
					value={password}
					name={'password'}
					icon='EditIcon'
					placeholder='Пароль'
				/>
				<div className={styles.buttons}>
					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						onClick={handleCancelClick}>
						Отмена
					</Button>

					<Button
						htmlType='button'
						type='primary'
						size='medium'
						onClick={handleSaveClick}>
						Сохранить
					</Button>
				</div>
			</div>
		</div>
	);
}
function signOut(email: string, password: string) {
	throw new Error('Function not implemented.');
}
