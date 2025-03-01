import { useCallback, useEffect } from 'react';
import './modal-overlay.css';

const ModalOverlay = ({ onClose }: { onClose: () => void }) => {
	const handleKeyDown = useCallback(
		(e: any) => {
			if (e.key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div className='modalOverlay' onClick={onClose} onKeyDown={handleKeyDown} />
	);
};

export default ModalOverlay;
