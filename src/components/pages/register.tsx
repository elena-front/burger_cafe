import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';

export function Register() {
	const [name, setName] = useState('');
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const [email, setEmail] = useState('');
	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const [password, setPassword] = useState('');
	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<div className={styles.registerPage}>
			<div className={styles.inputs}>
				<div className='text text_type_main-medium'>Регистрация</div>

				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={onChangeName}
					value={name}
					error={false}
					errorText={'Ошибка'}
					extraClass='ml-1'
				/>

				<EmailInput
					onChange={onChangeEmail}
					value={email}
					name={'email'}
					isIcon={false}
				/>

				<PasswordInput
					onChange={onChangePassword}
					value={password}
					name={'password'}
					placeholder='Пароль'
					extraClass='mb-2'
				/>

				<Button htmlType='button' type='primary' size='large'>
					Зарегистрироваться
				</Button>
			</div>

			<div>
				<span className='text text_type_main-default text_color_inactive'>
					Уже зарегистрированы?{' '}
				</span>
				<Link to='/login' className='text text_type_main-default'>
					Войти
				</Link>
			</div>
		</div>
	);
}
