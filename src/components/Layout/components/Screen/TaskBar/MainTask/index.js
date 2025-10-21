import HasContentsTask from './HasContentsTask/index.js';
import NoContentTask from './NoContentTask/index.js';

function MainTask() {
    const myDataKey = 'Daily_Calculations';
    const jsonString = localStorage.getItem(myDataKey);

    return (
        <>
            {/*
          Kiểm tra điều kiện:
          jsonString sẽ là chuỗi JSON nếu có dữ liệu, hoặc là null nếu không có.
          Nếu jsonString tồn tại và không phải là chuỗi rỗng (thêm điều kiện an toàn),
          thì render HasContentsTask, ngược lại render NoContentTask.
        */}
            {jsonString && jsonString.length > 0 ? (
                <HasContentsTask data={JSON.parse(jsonString)} />
            ) : (
                <NoContentTask />
            )}
        </>
    );
}

export default MainTask;
