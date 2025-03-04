import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type ModalProps = {
	children: React.ReactNode;
	title: string;
	onClose: () => void;
};

const Modal = ({ children, title, onClose }: ModalProps) => {
	const [domReady, setDomReady] = useState(false);

	const handleKeyDown = useCallback(
		(e: any) => {
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
					<div className='modal'>
						<div className='modalHeader'>
							<div className='text text_type_main-large'>{title}</div>
							<CloseIcon type='primary' onClick={onClose} />
						</div>
						{children}
					</div>
				</>,
				document.getElementById('react-modals')!
		  )
		: null;
};

export default Modal;
