import { useState, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            // Lấy giá trị đã lưu, nếu không có thì dùng giá trị khởi tạo
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Lỗi khi đọc Local Storage key "${key}":`, error);
        }
    });

    const saveData = useCallback(
        (value) => {
            try {
                // Cập nhật state
                setStoredValue(value);
                // Lưu vào Local Storage (JSON.stringify)
                window.localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(`Lỗi khi lưu Local Storage key "${key}":`, error);
            }
        },
        [key],
    );
    const updateData = useCallback(
        (callBackValue) => {
            setStoredValue((currData) => {
                let newData;
                if (typeof callBackValue === 'function') {
                    newData = callBackValue(currData);
                } else newData = callBackValue;
                try {
                    // Lưu giá trị mới vào Local Storage
                    window.localStorage.setItem(key, JSON.stringify(newData));
                    return newData; // Cập nhật state
                } catch (error) {
                    console.error(`Lỗi khi cập nhật Local Storage key "${key}":`, error);
                    return currData; // Giữ lại giá trị cũ nếu có lỗi
                }
            });
        },
        [key],
    );
    const removeData = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue({}); // reference mới -> rerender chắc chắn
        } catch (error) {
            console.error(`Lỗi khi xóa Local Storage key "${key}":`, error);
        }
    }, [key]);

    return [storedValue, saveData, updateData, removeData];
}
