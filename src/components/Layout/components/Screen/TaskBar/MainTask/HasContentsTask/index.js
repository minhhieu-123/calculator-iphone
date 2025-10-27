import classNames from 'classnames/bind';
import styles from '../MainTask.Module.scss';
import { useLocalStorage } from '../../../../../../../hooks/useLocalStorage';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function HasContentsTask(props) {
    const GLOBAL_KEY = 'Daily_Calculations';
    const initialLocalValue = {};
    const [allDailyData, , updateData, clearAll] = useLocalStorage(GLOBAL_KEY, initialLocalValue);

    //Handle check checkbox
    const [check, setCheck] = useState([]);
    const handleCheck = (idDelete) => {
        check.includes(idDelete)
            ? setCheck((prev) => prev.filter((item) => item !== idDelete))
            : setCheck((prev) => [...prev, idDelete]);
    };
    //Delete with seclect
    function removeByIdsImmutable(obj, ids) {
        const newObj = {};
        for (const date in obj) {
            newObj[date] = obj[date].filter((item) => !ids.includes(item.id));
        }
        return newObj;
    }

    const deleteSelected = () => {
        const newData = removeByIdsImmutable(allDailyData, check);
        console.log(newData);
        updateData(newData);
    };
    // ON//OFF button
    const [onCheck, setOffCheck] = useState(false);
    const handleOnCheck = () => {
        setOffCheck(!onCheck);
        setCheck([]);
    };
    console.log(check);
    // screen expresstion
    useEffect(() => {
        const stickies = document.querySelectorAll('.GroupDatasContent_Date');
        const sentinels = document.querySelectorAll('.sentinel');

        if (!stickies.length || !sentinels.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = [...sentinels].indexOf(entry.target); // sentinel thứ mấy
                    const sticky = stickies[index]; // sticky tương ứng
                    if (!sticky) return;

                    if (entry.intersectionRatio < 1) {
                        sticky.closest('.GroupDatasContent_Column').classList.add('is-stuck');
                    } else {
                        sticky.closest('.GroupDatasContent_Column').classList.remove('is-stuck');
                    }
                });
            },
            { threshold: [1] },
        );

        sentinels.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [allDailyData]); // khi đổi data thì attach lại

    return (
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
                            <span className="sentinel"></span>
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
                                    <div className={cx('GroupDatasContent_Column')} key={item.id || index}>
                                        {onCheck && (
                                            <div className={cx('GroupDatasContent_Checkbox')}>
                                                <input
                                                    id={item.id}
                                                    type="checkbox"
                                                    key={item.id || index}
                                                    checked={check.includes(item.id)}
                                                    onChange={() => handleCheck(item.id)}
                                                />
                                                <div className="custom-checkbox"></div>
                                            </div>
                                        )}

                                        <div className={cx('GroupDatasContent_Info')}>
                                            {/* ✅ ĐIỀN BIỂU THỨC (EXPRESSION) VÀO ĐÂY */}
                                            <div className={cx('GroupDatasContent_Math')}>{expressionString}</div>

                                            {/* ✅ ĐIỀN KẾT QUẢ (RESULT) VÀO ĐÂY */}
                                            <div className={cx('GroupDatasContent_Result')}>{resultString}</div>
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
                    {onCheck ? (
                        <button onClick={() => handleOnCheck()} className={cx('GroupTaskFooter_Edit')}>
                            Xong
                        </button>
                    ) : (
                        <button onClick={() => handleOnCheck()} className={cx('GroupTaskFooter_Edit')}>
                            Sửa
                        </button>
                    )}
                </div>
                <div className={cx('GroupTaskFooter_GroupButton')}>
                    {onCheck ? (
                        <button
                            onClick={check.length > 0 ? () => deleteSelected() : undefined}
                            className={cx(
                                check.length > 0 ? 'GroupTaskFooter_ClearAll' : 'GroupTaskFooter_ClearAll_Disable',
                            )}
                        >
                            Xóa đã chọn
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                clearAll();
                                props.value(initialLocalValue);
                            }}
                            className={cx('GroupTaskFooter_ClearAll')}
                        >
                            Xóa hết
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default HasContentsTask;
