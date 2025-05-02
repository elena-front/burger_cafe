import { ChangeEvent, useState } from 'react';
import { AppDispatch, RootState } from '../services/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> =
	useSelector<RootState>;

export const useForm = <T>(input: T) => {
	const [values, setValues] = useState<T>(input);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setValues({ ...values, [name]: value });
	};

	return { values, handleChange, setValues };
};
