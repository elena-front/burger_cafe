import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import styles from './forgot-password.module.css';
import { Link } from 'react-router-dom';

export function ForgotPassword() {
	const [forgotPassword, setForgotPassword] = useState('');

	const onChangeForgotPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setForgotPassword(e.target.value);
	};

	return (
		<div className={styles.forgotPassword}>
			<div className={styles.input}>
				<div className='text text_type_main-medium'>Восстановление пароля</div>

				<PasswordInput
					onChange={onChangeForgotPassword}
					value={forgotPassword}
					name={'forgotPassword'}
					extraClass='mb-2'
				/>

				<Button htmlType='button' type='primary' size='large'>
					Восстановить
				</Button>
			</div>

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
