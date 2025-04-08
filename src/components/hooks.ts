import { ChangeEvent, useState } from 'react';
import { AppDispatch, AppStore, RootState } from '../services/store';
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export const useForm = <T>(input: T) => {
	const [values, setValues] = useState<T>(input);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setValues({ ...values, [name]: value });
	};

	return { values, handleChange, setValues };
};
