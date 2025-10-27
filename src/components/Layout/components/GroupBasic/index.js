// GroupBasic: Hiển thị nhóm các nút cơ bản của calculator
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { actions, useStore } from '../../../../store';

import Button from '~/components/Buttons';
import { GROUPS_B_BUTTONS } from '../../../Datas';

import ModalContainer from '../../../Modal/ModalContainer';
import { useModal } from '../../../../storeModal';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { getDateKey, getTimeString } from '../../../../utils/dateUtils';
function GroupBasic() {
    // Lấy state và dispatch từ context của calculator
    const [state, dispatch] = useStore();
    const { currInput, screenInput, exportInput } = state;
    const GLOBAL_KEY = 'Daily_Calculations';
    const initialLocalValue = {};
    const [allDailyData, setAllDailyData, updateDailyData] = useLocalStorage(GLOBAL_KEY, initialLocalValue);

    useEffect(() => {
        // chỉ chạy khi người dùng nhấn "="
        if (currInput !== '=') return;
        if (!exportInput || !screenInput) return;

        const nowDay = getDateKey();
        const newId = getTimeString();

        const newDataEntry = {
            id: newId,
            expression: exportInput,
            result: screenInput,
        };

        updateDailyData((currentData) => {
            const todayEntries = currentData[nowDay] || [];
            return {
                ...currentData,
                [nowDay]: [...todayEntries, newDataEntry],
            };
        });
    }, [currInput]); // ✅ CHỈ theo dõi khi currInput đổi (ấn "=")

    // Lấy trạng thái modal từ context
    const { openModal } = useModal();

    // deleteMode: xác định nút Delete hay AC sẽ hiển thị
    const [deleteMode, setDeleteMode] = useState(false);
    useEffect(() => {
        // Nếu vừa thực hiện phép tính (=), chuyển về nút AC
        if (currInput === '=') {
            setDeleteMode(false);
        }
        // Nếu có input, chuyển sang nút Delete
        else if ((currInput !== '' && screenInput.length >= 1) || (currInput === '' && screenInput.length >= 1)) {
            setDeleteMode(true);
        } else {
            setDeleteMode(false);
        }
    }, [currInput, screenInput]);

    const openAlert = () => {
        openModal(<ModalContainer small></ModalContainer>);
        // logic small
    };

    return (
        <>
            {/* Render các nút cơ bản từ GROUPS_B_BUTTONS */}
            {GROUPS_B_BUTTONS &&
                GROUPS_B_BUTTONS.map((btn) => {
                    // Tạo props động cho Button (ví dụ: className)
                    const dynamicProps = { [btn.className]: true };

                    // Hàm xử lý dispatch action cho từng nút
                    const handleDispatch = (payload, action) => (e) => {
                        e.preventDefault();
                        switch (action) {
                            case 'setMenu':
                                // Thay 'YOUR_KEY' bằng khóa bạn muốn xem (Ví dụ: 'Daily_Calculations')
                                const myDataKey = 'Daily_Calculations';
                                const jsonString = localStorage.getItem(myDataKey);

                                // Kiểm tra xem dữ liệu có tồn tại không
                                if (jsonString) {
                                    try {
                                        // Phân tích chuỗi JSON thành object và in ra
                                        const dataObject = JSON.parse(jsonString);
                                        console.log(`Dữ liệu của Key "${myDataKey}":`);
                                        console.log(dataObject);
                                    } catch (e) {
                                        console.error('Lỗi khi phân tích cú pháp JSON:', e);
                                    }
                                } else {
                                    console.log(`Không tìm thấy dữ liệu với Key "${myDataKey}".`);
                                }
                                // Đóng/mở modal menu
                                openAlert();
                                break;
                            case 'deleteAction':
                                // Xóa ký tự
                                dispatch(actions.deleteAction(payload));
                                break;
                            case 'setScreen':
                                // Thêm ký tự lên màn hình
                                dispatch(actions.setScreen(payload));
                                break;
                            case 'resetAction':
                                // Reset toàn bộ input
                                dispatch(actions.resetAction(payload));
                                break;
                            case 'inverseAction':
                                // Đảo dấu số hiện tại, kiểm tra không cho đảo liên tiếp toán tử
                                const operator = ['+', '-', '*', '/', '.'];
                                if (operator.includes(payload.value) && operator.includes(state.currInput)) return;
                                dispatch(actions.inverseAction(payload));
                                break;
                            case 'exportAction':
                                // Thực hiện phép tính
                                dispatch(actions.exportAction(payload));
                                break;
                            default:
                                console.warn('Unknown action');
                        }
                    };

                    // Xác định title, value, action cho nút (AC/Delete)
                    const handleTitle = Array.isArray(btn.titles) ? btn.titles[deleteMode ? 1 : 0] : btn.title;
                    const handleValue = Array.isArray(btn.values) ? btn.values[deleteMode ? 1 : 0] : btn.value;
                    const handleAction = Array.isArray(btn.actions) ? btn.actions[deleteMode ? 1 : 0] : btn.action;

                    return (
                        <Grid key={btn.id} item size={3}>
                            {/* Nút bấm calculator */}
                            <Button
                                type="button"
                                onClick={handleDispatch(
                                    { value: handleValue, title: handleTitle, kind: btn.kind },
                                    handleAction,
                                )}
                                {...dynamicProps}
                            >
                                {handleTitle}
                            </Button>
                        </Grid>
                    );
                })}
        </>
    );
}

export default GroupBasic;
