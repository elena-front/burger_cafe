import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './account.module.css';
import { useCallback } from 'react';
import { updateUserInfo } from '../../services/actions';
import { User } from '../../types';
import { useAppDispatch, useAppSelector, useForm } from '../hooks';
import { shallowEqual } from 'react-redux';

type FormState = {
	readonly name: string;
	readonly email: string;
	readonly password: string;
};

export function Account() {
	const dispatch = useAppDispatch();
	const user = useAppSelector<User | null>((store) => store.user, shallowEqual);

	const initState: FormState = {
		name: user?.name || '',
		email: user?.email || '',
		password: '',
	};

	const { values, handleChange, setValues } = useForm<FormState>(initState);

	const handleCancelClick = useCallback(() => {
		setValues(initState);
	}, [initState]);

	const handleSaveClick = useCallback(() => {
		dispatch(updateUserInfo(values));
	}, [values]);

	const isChanged = () => {
		return (
			values.password != initState.password ||
			values.name != initState.name ||
			values.email != initState.email
		);
	};

	return (
		<div className={styles.inputs}>
			<Input
				onChange={handleChange}
				value={values.name}
				name={'name'}
				placeholder='Имя'
				icon='EditIcon'
				extraClass='mb-2'
			/>

			<EmailInput
				onChange={handleChange}
				value={values.email}
				name={'email'}
				placeholder='Логин'
				isIcon={true}
				extraClass='mb-2'
			/>

			<PasswordInput
				onChange={handleChange}
				value={values.password}
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
