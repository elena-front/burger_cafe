import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useCallback } from 'react';
import styles from './register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useForm } from '../components/hooks';
import { useAuth } from '../services/auth';

type FormState = {
	readonly email: string;
	readonly name: string;
	readonly password: string;
};

export function Register() {
	const { values, handleChange } = useForm<FormState>({
		email: '',
		name: '',
		password: '',
	});

	const dispatch = useAppDispatch();
	const { signUp } = useAuth(dispatch);

	const navigate = useNavigate();

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			signUp(values.name, values.email, values.password)
				.then(() => navigate('/'))
				.catch(() => console.error('не удалось зарегистрироваться'));
		},
		[values]
	);

	return (
		<div className={styles.registerPage}>
			<form className={styles.inputs} onSubmit={handleSubmit}>
				<div className='text text_type_main-medium'>Регистрация</div>

				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={handleChange}
					value={values.name}
					error={false}
					errorText={'Ошибка'}
					extraClass='ml-1'
				/>

				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					isIcon={false}
				/>

				<PasswordInput
					onChange={handleChange}
					value={values.password}
					name={'password'}
					placeholder='Пароль'
					extraClass='mb-2'
				/>

				<Button htmlType='submit' type='primary' size='large'>
					Зарегистрироваться
				</Button>
			</form>

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
