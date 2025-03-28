import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import styles from './reset-password.module.css';
import { Link } from 'react-router-dom';

export function ResetPassword() {
	const [newPassword, setNewPassword] = useState('');
	const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};

	const [code, setCode] = useState('');
	const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	};

	return (
		<div className={styles.page}>
			<div className={styles.inputs}>
				<div className='text text_type_main-medium'>Восстановление пароля</div>

				<PasswordInput
					onChange={onChangeNewPassword}
					value={newPassword}
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

				<Button htmlType='button' type='primary' size='large'>
					Сохранить
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
