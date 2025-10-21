import classNames from 'classnames/bind';
import styles from '../MainTask.Module.scss';
import { useLocalStorage } from '../../../../../../../hooks/useLocalStorage';
import React from 'react';

const cx = classNames.bind(styles);

function HasContentsTask() {
    const GLOBAL_KEY = 'Daily_Calculations';
    const initialLocalValue = {};
    const [allDailyData] = useLocalStorage(GLOBAL_KEY, initialLocalValue);
    return (
        //  <div className={cx('GroupDatasContent_SameDay')}>

        //             <div className={cx('GroupDatasContent_Column')}>

        //                 <div className={cx('GroupDatasContent_Date')}> abc</div>

        //             </div>

        //             <div className={cx('GroupDatasContent_Column')}>

        //                 <div className={cx('GroupDatasContent_Info')}>

        //                     <div className={cx('GroupDatasContent_Math')}> abc </div>

        //                     <div className={cx('GroupDatasContent_Result')}> 456</div>

        //                 </div>

        //             </div>

        //         </div>
        <>
            <div className={cx('GroupDatasContent')}>
                {/* Lặp qua TẤT CẢ các ngày (Keys của object) */}
                {Object.keys(allDailyData).map((dateKey) => {
                    // dateKey là chuỗi ngày: "2025-10-21"
                    const dailyEntries = allDailyData[dateKey];

                    // Kiểm tra nếu mảng ngày rỗng
                    if (!dailyEntries || dailyEntries.length === 0) {
                        return null;
                    }

                    return (
                        // Container cho toàn bộ các mục trong 1 ngày
                        <React.Fragment key={dateKey}>
                            {/* Hiển thị ngày (Date) chỉ 1 lần */}
                            <div className={cx('GroupDatasContent_Column')}>
                                {/* ✅ ĐIỀN DỮ LIỆU NGÀY VÀO ĐÂY */}
                                <div className={cx('GroupDatasContent_Date')}>{dateKey}</div>
                            </div>

                            {/* Lặp qua TẤT CẢ các phép tính trong ngày đó */}
                            {dailyEntries.map((item, index) => {
                                // Dữ liệu trong item: { expression: [...], result: [...] }

                                // Chuyển mảng expression/result thành chuỗi để hiển thị
                                // (Dựa vào ảnh, dữ liệu của bạn là mảng ký tự)
                                const expressionString = Array.isArray(item.expression)
                                    ? item.expression.join('')
                                    : item.expression;

                                const resultString = Array.isArray(item.result) ? item.result.join('') : item.result;

                                return (
                                    <div className={cx('GroupDatasContent_SameDay')} key={item.id || index}>
                                        {/* Cột trống (để căn chỉnh) */}

                                        {/* Cột chứa thông tin phép tính */}
                                        <div className={cx('GroupDatasContent_Column')}>
                                            <div className={cx('GroupDatasContent_Info')}>
                                                {/* ✅ ĐIỀN BIỂU THỨC (EXPRESSION) VÀO ĐÂY */}
                                                <div className={cx('GroupDatasContent_Math')}>{expressionString}</div>

                                                {/* ✅ ĐIỀN KẾT QUẢ (RESULT) VÀO ĐÂY */}
                                                <div className={cx('GroupDatasContent_Result')}>{resultString}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </div>
            <div className={cx('GroupTaskFooter')}>
                <div className={cx('GroupTaskFooter_GroupButton')}>
                    <button className={cx('GroupTaskFooter_Edit')}>Sửa</button>
                </div>
                <div className={cx('GroupTaskFooter_GroupButton')}>
                    <button className={cx('GroupTaskFooter_ClearAll')}>Xóa hết</button>
                </div>
            </div>
        </>
    );
}

export default HasContentsTask;
