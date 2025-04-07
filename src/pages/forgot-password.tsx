import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import styles from './forgot-password.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../components/hooks';
import { passwordReset } from '../services/actions';

export function ForgotPassword() {
	const [email, setEmail] = useState('');

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = useCallback((e: FormEvent) => {
		e.preventDefault();
		dispatch(passwordReset(email))
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
					onChange={onChangeEmail}
					value={email}
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
