const DiaryItem = ({
  onDelete,
  id,
  author,
  content,
  emotion,
  created_date,
}) => {
  return (
    <div className="DiaryItem">
      <span>ID : {id}</span>
      <br />
      <span>
        작성자 : {author} | 감정점수 : {emotion}
      </span>
      <br />
      <span className="date">{new Date(created_date).toLocaleString()}</span>
      <div className="content">{content}</div>
      <button
        onClick={() => {
          console.log(id);
          if (window.confirm(`${id}번째 일기를 삭제합니다.`)) {
            onDelete(id);
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default DiaryItem;
