import classNames from 'classnames/bind';
import styles from '../MainTask.Module.scss';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function NoContentTask() {
    return (
        <div className={cx('NoContentTask_Group')}>
            <FontAwesomeIcon icon={faClock} className={cx('NoContentTask_Icon')} />
            <div className={cx('NoContentTask_Text')}>Không có lịch sử</div>
        </div>
    );
}

export default NoContentTask;
