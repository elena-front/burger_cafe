import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useCallback, useState } from 'react';
import styles from './login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useForm } from '../components/hooks';
import { useAuth } from '../services/auth';
import { DEMO_MODE } from '../config';

type FormState = {
	readonly email: string;
	readonly password: string;
};

export function LoginPage() {
	const { values, handleChange } = useForm<FormState>({
		email: '',
		password: '',
	});

	const dispatch = useAppDispatch();
	const { signIn } = useAuth(dispatch);
	const [error, setError] = useState('');

	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			setError('');
			signIn(values.email, values.password)
				.then(() => {
					const nextLocation = location.state?.from || '/';
					return navigate(nextLocation, { replace: true });
				})
				.catch((reason: Error) => setError(reason.message || 'Не удалось войти'));
		},
		[values]
	);

	return (
		<div className={styles.loginPage}>
			<form className={styles.inputs} onSubmit={handleSubmit}>
				<div className='text text_type_main-medium'>Вход</div>
				<Input
					onChange={handleChange}
					value={values.email}
					name={'email'}
					placeholder='Логин'
					extraClass='mb-2'
				/>
				<PasswordInput
					onChange={handleChange}
					value={values.password}
					name={'password'}
					extraClass='mb-2'
				/>
				<Button htmlType='submit' type='primary' size='large'>
					Войти
				</Button>
				{error && <div role='alert' className='text text_type_main-default'>{error}</div>}
			</form>
			{DEMO_MODE && (
				<p className='text text_type_main-default text_color_inactive'>
					Демо-режим: demo@burger.local / demo12345. Данные сохраняются только в этом браузере.
				</p>
			)}

			<div className={styles.questions}>
				<div>
					<span className='text text_type_main-default text_color_inactive'>
						Вы - новый пользователь?{' '}
					</span>
					<Link to='/register' className='text text_type_main-default'>
						Зарегистрироваться
					</Link>
				</div>

				<div>
					<span className='text text_type_main-default text_color_inactive'>
						Забыли пароль?{' '}
					</span>
					<Link to='/forgot-password' className='text text_type_main-default'>
						Восстановить пароль
					</Link>
				</div>
			</div>
		</div>
	);
}
