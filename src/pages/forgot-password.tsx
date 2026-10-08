import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useCallback, useState } from 'react';
import styles from './forgot-password.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useForm } from '../components/hooks';
import { passwordReset } from '../services/actions';

type FormState = {
	readonly email: string;
};

export function ForgotPassword() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { values, handleChange } = useForm<FormState>({ email: '' });
	const [error, setError] = useState('');

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			setError('');
			dispatch(passwordReset(values.email))
				.unwrap()
				.then(() => {
					localStorage.setItem('resetPassword', 'true');
					return navigate('/reset-password');
				})
				.catch(() =>
					setError('Проверьте адрес электронной почты и попробуйте снова.')
				);
		},
		[dispatch, navigate, values.email]
	);

	return (
		<div className={styles.forgotPassword}>
			<form className={styles.input} onSubmit={handleSubmit}>
				<div className='text text_type_main-medium'>Восстановление пароля</div>

				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					extraClass='mb-2'
				/>
				{error && (
					<p className='text text_type_main-default' role='alert'>
						{error}
					</p>
				)}

				<Button htmlType='submit' type='primary' size='large'>
					Восстановить
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
