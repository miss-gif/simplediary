import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useRef, useState } from "react";
import Lifecycle from "./Lifecycle";

const App = () => {
  // 상태 변수 설정: data - 일기 데이터 배열, setData - 일기 데이터 갱신 함수
  const [data, setData] = useState([]);

  // useRef를 사용하여 각 일기 항목의 고유한 ID를 관리합니다.
  const dataId = useRef(0);

  // 일기 작성 함수 정의
  const onCreate = (author, content, emotion) => {
    // 현재 시간을 기반으로 생성일을 설정합니다.
    const created_date = new Date().getTime();

    // 새로운 일기 항목을 생성합니다.
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current, // 현재 일기 항목의 고유 ID를 할당합니다.
    };

    // 다음 일기 항목에 사용될 ID를 증가시킵니다.
    dataId.current += 1;

    // 새로운 일기 항목을 기존 데이터 배열의 맨 앞에 추가하여 갱신합니다.
    setData([newItem, ...data]);
  };

  // 일기 삭제 함수 정의
  const onRemove = (targetId) => {
    // 삭제 대상 ID를 기반으로 로그를 출력합니다.
    console.log(`${targetId}가 삭제되었습니다.`);

    // 대상 ID를 제외한 나머지 일기 항목으로 이루어진 새로운 배열을 생성합니다.
    const newDiaryList = data.filter((item) => item.id !== targetId);

    // 데이터를 갱신하여 삭제된 일기를 반영합니다.
    setData(newDiaryList);
  };

  // 일기 수정 함수 정의
  const onEdit = (targetId, newContent) => {
    // 대상 ID에 해당하는 일기 항목의 내용을 새로운 내용으로 업데이트합니다.
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;
