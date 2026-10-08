import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import styles from './reset-password.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useForm } from '../components/hooks';
import { setNewPassword } from '../services/actions';

type FormState = {
	readonly password: string;
	readonly code: string;
};

export function ResetPassword() {
	const { values, handleChange } = useForm<FormState>({
		password: '',
		code: '',
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState('');

	useEffect(() => {
		if (localStorage.getItem('resetPassword') !== 'true') {
			navigate('/forgot-password', { replace: true });
		}
	}, [navigate]);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			setError('');
			dispatch(
				setNewPassword({ password: values.password, token: values.code })
			)
				.unwrap()
				.then(() => {
					localStorage.removeItem('resetPassword');
					return navigate('/login', { replace: true });
				})
				.catch(() =>
					setError('Проверьте код и новый пароль и попробуйте снова.')
				);
		},
		[dispatch, navigate, values.password, values.code]
	);

	return (
		<div className={styles.page}>
			<form className={styles.inputs} onSubmit={handleSubmit}>
				<div className='text text_type_main-medium'>Восстановление пароля</div>

				<PasswordInput
					onChange={handleChange}
					value={values.password}
					name={'password'}
					extraClass='mb-2'
					placeholder='Введите новый пароль'
				/>

				<Input
					onChange={handleChange}
					value={values.code}
					name={'code'}
					placeholder='Введите код восстановления'
					extraClass='mb-2'
				/>
				{error && (
					<p className='text text_type_main-default' role='alert'>
						{error}
					</p>
				)}

				<Button htmlType='submit' type='primary' size='large'>
					Сохранить
				</Button>
			</form>

			<div>
				<span className='text text_type_main-default text_color_inactive'>
					Вспомнили пароль?{' '}
				</span>
				<Link to='/login' className='text text_type_main-default'>
					Войти
				</Link>
			</div>
		</div>
	);
}
