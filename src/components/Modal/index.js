import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

import { createPortal } from 'react-dom';
import { useModal } from '../../storeModal';

const cx = classNames.bind(styles);
function Modal({ children, className, onClose, ...passProps }) {
    const { closeModal } = useModal();

    const handleOverlayClick = (e) => {
        // nếu click vào overlay (div bên ngoài) thì đóng modal
        if (e.target === e.currentTarget) {
            closeModal(); // gọi hàm đóng từ parent/context
        }
    };

    return createPortal(
        <div className={cx('modalBasic')} onClick={handleOverlayClick}>
            {children}
        </div>,
        document.getElementById('Group_Modal'),
    );
}

export default Modal;
