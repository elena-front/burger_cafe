import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './account.module.css';
import React, { ChangeEvent, useCallback } from 'react';
import { updateUserInfo } from '../../services/actions';
import { UpdateUserInfoRequest, User } from '../../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { shallowEqual } from 'react-redux';

export function Account() {
	const dispatch = useAppDispatch();
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

	const handleCancelClick = useCallback(() => {
		setName(user?.login || '');
		setEmail(user?.email || '');
		setPassword('');
	}, []);

	const handleSaveClick = useCallback(() => {
		const update: UpdateUserInfoRequest = {
			name: name,
			email: email,
			password: password,
		};
		dispatch(updateUserInfo(update));
	}, [name, email, password]);

	const isChanged = () => {
		return password != '' || name != user?.login || email != user?.email;
	};

	return (
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
			{isChanged() && (
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
			)}
		</div>
	);
}
