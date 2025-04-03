import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useCallback, useState } from 'react';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { useAuth } from '../../services/auth';

export function LoginPage() {
	const [email, setEmail] = useState('');

	const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);

	const [password, setPassword] = useState('');

	const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}, []);

	const dispatch = useAppDispatch();
	const { signIn } = useAuth(dispatch);

	const navigate = useNavigate();

	const handleClick = useCallback(() => {
		signIn(email, password)
			.then(() => navigate('/'))
			.catch(() => console.error('не удалось войти'));
	}, []);

	return (
		<div className={styles.loginPage}>
			<div className={styles.inputs}>
				<div className='text text_type_main-medium'>Вход</div>
				<Input
					onChange={onChangeEmail}
					value={email}
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

				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleClick}>
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
