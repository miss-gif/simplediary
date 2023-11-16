import DiaryItem from "./DiaryItem";

const DiaryList = ({ onDelete, diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>DiaryList</h2>
      <p>{diaryList.length}개의 일기가 있습니다.</p>
      <div>
        {diaryList.map((item) => (
          <DiaryItem key={item.id} {...item} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
