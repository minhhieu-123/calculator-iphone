import classNames from 'classnames/bind';
import styles from '../MainTask.Module.scss';

const cx = classNames.bind(styles);

function HasContentsTask() {
    return (
        <>
            <div className={cx('GroupDatasContent')}>
                <div className={cx('GroupDatasContent_SameDay')}>
                    <div className={cx('GroupDatasContent_Column')}>
                        <div className={cx('GroupDatasContent_Date')}> abc</div>
                    </div>
                    <div className={cx('GroupDatasContent_Column')}>
                        <div className={cx('GroupDatasContent_Info')}>
                            <div className={cx('GroupDatasContent_Math')}> abc </div>
                            <div className={cx('GroupDatasContent_Result')}> 456</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HasContentsTask;
