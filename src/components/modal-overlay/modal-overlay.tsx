import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
	readonly onClose: () => void;
};

const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
	return <div className={styles.modalOverlay} onClick={onClose} />;
};

export default ModalOverlay;
