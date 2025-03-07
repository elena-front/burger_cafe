import { ConnectableElement, useDrag, useDrop } from 'react-dnd';
import { DraggingFilling, FillingItem } from '../../types';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { moveFilling } from '../../services/actions';
import { useDispatch } from 'react-redux';

type FillingBarProps = {
	item: FillingItem;
	onClose: (uid: string) => void;
};

export const FillingBar = ({ item, onClose }: FillingBarProps) => {
	const [{ isDrag }, drag] = useDrag<
		DraggingFilling,
		unknown,
		{ isDrag: boolean }
	>(
		{
			type: 'filling',
			item: { uid: item.uid },
			collect: (monitor) => ({
				isDrag: monitor.isDragging(),
			}),
		},
		[item]
	);

	const dispatch = useDispatch();

	const [, drop] = useDrop<DraggingFilling>({
		accept: 'filling',
		drop: (sourceItem) => {
			dispatch(moveFilling({ source: sourceItem.uid, dest: item.uid }));
		},
	});

	const attachRef = (el: ConnectableElement) => {
		drag(el);
		drop(el);
	};

	return (
		<>
			{!isDrag && (
				<li ref={attachRef} key={item.uid} className={styles.constructorItem}>
					<div className={styles.dragIcon}>
						<DragIcon type='primary' />
					</div>
					<ConstructorElement
						isLocked={false}
						text={item.ingredient.name}
						price={item.ingredient.price}
						thumbnail={item.ingredient.image}
						handleClose={() => onClose(item.uid)}
					/>
				</li>
			)}
		</>
	);
};
