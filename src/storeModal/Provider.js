import { useCallback, useContext, useState } from 'react';
import Context from './Context';
import Modal from '../components/Modal';

function Provider({ children }) {
    const [modals, setHideModal] = useState([]);

    // ✅ Mở modal mới
    const openModal = useCallback((content) => {
        setHideModal((prev) => [...prev, content]);
    }, []);

    // ✅ Đóng modal cuối cùng
    const closeModal = useCallback(() => {
        setHideModal((prev) => prev.slice(0, -1));
    }, []);

    // ✅ Đóng tất cả modal (nếu cần)
    const closeAll = useCallback(() => {
        setHideModal([]);
    }, []);

    return (
        <Context.Provider value={{ openModal, closeModal, closeAll }}>
            {children}
            {modals.map((modalContent, i) => (
                <Modal key={i} style={{ zIndex: 1000 + 1 }}>
                    {modalContent}
                </Modal>
            ))}
        </Context.Provider>
    );
}

export default Provider;
