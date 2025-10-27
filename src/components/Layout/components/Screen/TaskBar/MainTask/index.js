import HasContentsTask from './HasContentsTask/index.js';
import NoContentTask from './NoContentTask/index.js';
import { useLocalStorage } from '../../../../../../hooks/useLocalStorage.js';
import { useEffect, useState } from 'react';

function MainTask() {
    const GLOBAL_KEY = 'Daily_Calculations';
    const initialLocalValue = null;

    const [allDailyData, , , clearAll] = useLocalStorage(GLOBAL_KEY, initialLocalValue);
    const [data, setData] = useState(allDailyData);

    const isEmptyObject = (obj) => obj === null || (typeof obj === 'object' && Object.keys(obj).length === 0);

    // ✅ checkData: lấy dữ liệu trực tiếp từ localStorage
    const checkData = () => {
        const raw = localStorage.getItem(GLOBAL_KEY); // lấy trực tiếp trong local
        console.log('📦 [checkData] localStorage raw:', raw);

        if (!raw) {
            console.log('⛔ [checkData] localStorage không có key -> setData(null)');
            setData(null);
            return;
        }

        const parsed = JSON.parse(raw);
        console.log('✅ [checkData] parsed:', parsed);

        if (isEmptyObject(parsed)) {
            console.log('⛔ [checkData] parsed rỗng -> setData(null)');
            setData(null);
        } else {
            console.log('📥 [checkData] parsed có dữ liệu -> setData(parsed)');
            setData(parsed);
        }
    };

    // ✅ lắng nghe thay đổi state từ hook
    useEffect(() => {
        console.log('🔥 [useEffect] allDailyData changed:', allDailyData);
        setData(allDailyData);
    }, [allDailyData]);

    return (
        <>
            {(() => {
                console.log('👁‍🗨 [Render] data:', data);
                return !isEmptyObject(data) ? <HasContentsTask value={checkData} /> : <NoContentTask />;
            })()}
        </>
    );
}

export default MainTask;
