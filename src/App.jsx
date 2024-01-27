import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import Lifecycle from "./Lifecycle";
import OptimizeTest from "./OptimizeTest";

const App = () => {
  // getData 함수: 외부 API에서 데이터를 가져와 초기 데이터를 설정하는 비동기 함수
  const getData = async () => {
    // 외부 API에서 댓글 데이터를 가져오기
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    console.log(res);

    // 가져온 데이터 중 처음 20개를 선택하여 초기 데이터로 가공
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 랜덤한 감정 값 부여 (1에서 5까지)
        created_date: new Date().getTime(), // 현재 시간을 생성 일자로 설정
        id: dataId.current++, // 고유한 ID 부여 및 증가
      };
    });

    // 초기 데이터를 상태로 설정
    setData(initData);
  };

  // useEffect: 컴포넌트가 마운트될 때 한 번만 getData 함수 호출
  useEffect(() => {
    getData();
  }, []);

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
  const onRemove = useCallback((targetId) => {
    // 삭제 대상 ID를 기반으로 로그를 출력합니다.
    console.log(`${targetId}가 삭제되었습니다.`);

    // 데이터를 갱신하여 삭제된 일기를 반영합니다.
    setData((data) => data.filter((item) => item.id !== targetId));
  }, []);

  // 일기 수정 함수 정의
  const onEdit = useCallback((targetId, newContent) => {
    // 대상 ID에 해당하는 일기 항목의 내용을 새로운 내용으로 업데이트합니다.
    setData((data) =>
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  }, []);

  // useMemo를 사용하여 일기 분석 데이터를 계산하는 함수
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");

    // '감정'이 3 이상인 일기의 개수 계산
    const goodCount = data.filter((item) => item.emotion >= 3).length;

    // '감정'이 3 미만인 일기의 개수 계산
    const badCount = data.length - goodCount;

    // '감정'이 3 이상인 일기의 비율 계산 (백분율)
    const goodRatio = ((goodCount / data.length) * 100).toFixed(1);

    // 결과를 객체로 반환
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <Lifecycle />
      <OptimizeTest />
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 갯수 : {goodCount}</div>
      <div>기분 나쁜 일기 갯수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;
