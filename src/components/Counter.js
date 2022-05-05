import { useCallback, useEffect, useState } from "react";
import { Button } from "primereact/button";

import style from "./styles/Counter.module.scss";

const Counter = (props) => {
  const { setVisitors, totalVisitors } = props;
  const [counter, setCounter] = useState(0);

  const minusCounter = useCallback(() => {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const plusCounter = useCallback(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  useEffect(() => setVisitors(counter), [counter, setVisitors]);

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
        disabled={totalVisitors === 4}
        onClick={plusCounter}
      />
    </div>
  );
};

export default Counter;
