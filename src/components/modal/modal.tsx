import { useEffect, useState, useCallback, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type ModalProps = {
	readonly children: ReactNode;
	readonly title?: ReactNode;
	readonly onClose: () => void;
};

const Modal = ({ children, title, onClose }: ModalProps) => {
	const [domReady, setDomReady] = useState(false);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		setDomReady(true);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return domReady
		? ReactDOM.createPortal(
				<>
					<ModalOverlay onClose={onClose} />
					<div className={styles.modal}>
						<div className={styles.modalHeader} data-testid={'modal-header'}>
							<CloseIcon type='primary' onClick={onClose} />
							{title}
						</div>
						{children}
					</div>
				</>,
				document.getElementById('react-modals')!
		  )
		: null;
};

export default Modal;
