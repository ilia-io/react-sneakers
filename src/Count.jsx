import React, { useState } from 'react';



function Count(props) {
  const [count, setCount] = useState(0)

  function handleCountInc() {
    setCount(count + 1)
  }

  function handleCountDec() {
    setCount(count - 1)
  }

  return (
    <center className="count">
      <h1>{count}</h1>
      <button onClick={handleCountInc}>
        +
      </button>
      <button onClick={handleCountDec}>
        -
      </button>
    </center>
  );
}

export default Count;
