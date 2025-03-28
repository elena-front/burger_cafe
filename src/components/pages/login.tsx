import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';

export function LoginPage() {
	const [value, setValue] = useState('');

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const [password, setPassword] = useState('');

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<div className={styles.loginPage}>
			<div className={styles.inputs}>
				<div className='text text_type_main-medium'>Вход</div>
				<Input
					onChange={onChangeEmail}
					value={value}
					name={'email'}
					placeholder='Логин'
					extraClass='mb-2'
				/>
				<PasswordInput
					onChange={onChangePassword}
					value={password}
					name={'password'}
					extraClass='mb-2'
				/>

				<Button htmlType='button' type='primary' size='large'>
					Войти
				</Button>
			</div>

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
