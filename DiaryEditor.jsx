import React, { useState } from "react";
import second from "./src/App.css";

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(state);
    alert("저장되었습니다!");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          type="text"
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
        <div>
          <textarea
            name="content"
            value={state.content}
            onChange={handleChangeState}
          ></textarea>
        </div>
      </div>
      <div>
        <p>오늘의 감정 점수</p>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
