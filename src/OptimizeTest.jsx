import React, { useEffect, useState } from "react";

const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`updateText ::  Text : ${text}`);
  });
  return <div>{text}</div>;
});

TextView.displayName = "TextView";

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`updateCount ::  count : ${count}`);
  });
  return <div> {count}</div>;
});

CountView.displayName = "CountView";

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <div>
        <h2>count</h2>
        <CountView count={count}></CountView>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text}></TextView>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default OptimizeTest;
