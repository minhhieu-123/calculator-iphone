/**
 * Trích xuất ngày, tháng, năm từ đối tượng Date.
 * @returns {number[]} Mảng chứa [Ngày, Tháng, Năm].
 * Lưu ý: Tháng (getMonth()) trả về từ 0-11 nên cần +1.
 */
export function getDateParts() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // getMonth() trả về 0-11
    const year = now.getFullYear();

    return [day, month, year];
}

/**
 * Lấy Giờ, Phút, Giây và ghép thành một chuỗi (ví dụ: "123045").
 * @returns {string} Chuỗi định dạng GiờPhútGiây.
 */

// Biến dùng để giữ bộ đếm. Nó nằm ngoài hàm để giữ giá trị giữa các lần gọi.
let counter = 0;
let lastTime = ''; // Lưu trữ chuỗi thời gian của lần gọi trước

export function getTimeString() {
    const now = new Date();

    // Hàm padding để thêm số 0
    const pad = (num, length = 2) => String(num).padStart(length, '0');

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    const milliseconds = pad(now.getMilliseconds(), 3);

    // 1. Tạo chuỗi thời gian cơ sở (HHmmssSSS)
    const currentTime = `${hours}${minutes}${seconds}${milliseconds}`;

    // 2. Cập nhật bộ đếm
    if (currentTime !== lastTime) {
        // Nếu thời gian đã thay đổi (thậm chí chỉ 1ms), reset counter
        counter = 0;
    } else {
        // Nếu thời gian vẫn là mili giây cuối cùng, tăng counter
        counter++;
    }

    // 3. Lưu thời gian hiện tại cho lần gọi kế tiếp
    lastTime = currentTime;

    // 4. Kết hợp Thời gian và Bộ đếm (Ví dụ: 123045987001)
    // Dùng padding 3 chữ số cho counter (tối đa 999 ID/ms)
    const counterString = pad(counter, 3);

    // Trả về chuỗi ID cuối cùng (HHmmssSSSCCC)
    return `${currentTime}${counterString}`;
}

// Khi bạn muốn sử dụng:
// const newId1 = getTimeStringWithCounter(); // Ví dụ: "100530550000"
// const newId2 = getTimeStringWithCounter(); // Ví dụ: "100530550001" (nếu gọi quá nhanh)
/**
 * Lấy ngày tháng năm định dạng "YYYY-MM-DD" để sử dụng làm key (Tùy chọn hữu ích)
 * @returns {string} Chuỗi định dạng "YYYY-MM-DD".
 */
export function getDateKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
