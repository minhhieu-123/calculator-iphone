import classNames from 'classnames/bind';
import styles from '../TaskBar.module.scss';
import { useModal } from '../../../../../../storeModal';

const cx = classNames.bind(styles);

function HeaderTask() {
    const { closeModal } = useModal();
    return (
        <div className={cx('GroupHeaderTask')}>
            <div className={cx('GroupHeaderTask_Stick')}></div>
            <button className={cx('GroupHeaderTask_Close')} onClick={() => closeModal()}>
                Xong
            </button>
        </div>
    );
}

export default HeaderTask;
