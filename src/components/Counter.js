import { useCallback, useEffect, useState } from "react";
import { Button } from "primereact/button";

import style from "./Counter.module.css";

const Counter = (props) => {
  const { setVisitors, totalVisitors } = props;
  const [counter, setCounter] = useState(0);

  const minusCounter = useCallback(() => {
    setCounter(counter - 1);
  }, [counter]);

  const plusCounter = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  useEffect(() => setVisitors(counter), [counter]);

  return (
    <div className={style.container}>
      <Button
        icon="pi pi-minus"
        className="p-button-sm p-button-rounded p-button-secondary"
        disabled={!counter}
        onClick={minusCounter}
      />
      <span className={style.number}>{counter}</span>
      <Button
        icon="pi pi-plus"
        className="p-button-sm p-button-rounded p-button-secondary"
        disabled={counter === 4 && totalVisitors === 4}
        onClick={plusCounter}
      />
    </div>
  );
};

export default Counter;
