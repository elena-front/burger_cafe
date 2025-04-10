import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useCallback } from 'react';
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

	const handleSubmit = useCallback((e: FormEvent) => {
		e.preventDefault();
		dispatch(passwordReset(values.email))
			.unwrap()
			.then(() => {
				localStorage.setItem('resetPassword', 'true');
				return navigate('/reset-password');
			})
			.catch(() => console.error('не удалось'));
	}, []);

	return (
		<div className={styles.forgotPassword}>
			<form className={styles.input} onSubmit={handleSubmit}>
				<div className='text text_type_main-medium'>Восстановление пароля</div>

				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'forgotPassword'}
					extraClass='mb-2'
				/>

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
