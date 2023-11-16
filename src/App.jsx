import DiaryEditor from "./../DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "John",
    content: "This is",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "dddd",
    content: "This is",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "eeeee",
    content: "This is",
    emotion: 2,
    created_date: new Date().getTime(),
  },
];

const App = () => {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
};

export default App;
