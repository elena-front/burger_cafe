import styles from './constructor-element-placeholder.module.css';

type Props = {
	readonly text: string;
	readonly type?: 'top' | 'bottom';
};

export default function ConstructorElementPlaceholder(props: Props) {
	const { text, type } = props;

	return (
		<div
			className={`${styles.placeholder} ${type && styles[type]}`}
			data-testid={`burger-placeholder${(type && '-' + type) || ''}`}>
			<span className='text text_type_main-default'>{text}</span>
		</div>
	);
}
