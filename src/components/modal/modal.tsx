import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({
	children,
	title,
	onClose,
}: {
	children: React.ReactNode;
	title: string;
	onClose: () => void;
}) => {
	const [domReady, setDomReady] = useState(false);

	useEffect(() => {
		setDomReady(true);
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
