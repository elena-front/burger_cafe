import './modal-overlay.css';

type ModalOverlayProps = {
	onClose: () => void;
};

const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
	return <div className='modalOverlay' onClick={onClose} />;
};

export default ModalOverlay;
