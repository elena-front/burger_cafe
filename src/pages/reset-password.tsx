import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useState,
} from 'react';
import styles from './reset-password.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../components/hooks';
import { setNewPassword } from '../services/actions';

export function ResetPassword() {
	const [password, setPassword] = useState('');
	const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const dispatch = useAppDispatch();

	const [code, setCode] = useState('');
	const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	};
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('resetPassword') !== 'true') {
			navigate('/forgot-password', { replace: true });
		}
	}, []);

	const handleSubmit = useCallback((e: FormEvent) => {
		e.preventDefault();
		dispatch(setNewPassword({ password: password, token: code }))
			.unwrap()
			.then(() => {});
	}, []);

	return (
		<div className={styles.page}>
			<form className={styles.inputs} onSubmit={handleSubmit}>
				<div className='text text_type_main-medium'>Восстановление пароля</div>

				<PasswordInput
					onChange={onChangeNewPassword}
					value={password}
					name={'newPassword'}
					extraClass='mb-2'
					placeholder='Введите новый пароль'
				/>

				<Input
					onChange={onChangeCode}
					value={code}
					name={'code'}
					placeholder='Введите код из письма'
					extraClass='mb-2'
				/>

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
