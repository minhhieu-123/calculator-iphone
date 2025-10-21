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
export function getTimeString() {
    const now = new Date();

    // Hàm padding để thêm số 0 vào trước (ví dụ: 9 -> "09")
    const pad = (num) => String(num).padStart(2, '0');

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    // Ghép chuỗi
    return `${hours}${minutes}${seconds}`; // Ví dụ: "123045"
}

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
