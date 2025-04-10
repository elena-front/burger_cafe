import { ConnectableElement, useDrag, useDrop } from 'react-dnd';
import { DraggingFilling } from '../../types';
import styles from './burger-constructor.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { moveFilling } from '../../services/actions';
import { useAppDispatch } from '../hooks';
import { ReactNode } from 'react';

type FillingBarProps = {
	readonly uid: string;
	readonly children: ReactNode;
};

export const FillingBar = ({ uid, children }: FillingBarProps) => {
	const [{ isDrag }, drag] = useDrag<
		DraggingFilling,
		unknown,
		{ isDrag: boolean }
	>(
		{
			type: 'filling',
			item: { uid: uid },
			collect: (monitor) => ({
				isDrag: monitor.isDragging(),
			}),
		},
		[uid]
	);

	const dispatch = useAppDispatch();

	const [, drop] = useDrop<DraggingFilling>({
		accept: 'filling',
		drop: (sourceItem) => {
			dispatch(moveFilling({ source: sourceItem.uid, dest: uid }));
		},
	});

	const attachRef = (el: ConnectableElement) => {
		drag(el);
		drop(el);
	};

	return (
		<>
			{!isDrag && (
				<li ref={attachRef} key={uid} className={styles.constructorItem}>
					<div className={styles.dragIcon}>
						<DragIcon type='primary' />
					</div>
					{children}
				</li>
			)}
		</>
	);
};
