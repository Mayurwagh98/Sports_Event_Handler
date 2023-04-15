import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";

function Timer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleStart = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const handleStop = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h3>{formatTime(time)}</h3>
      <Button onClick={handleStart} disabled={isActive} type="primary">
        Start Event
      </Button>
      <Button onClick={handleStop} disabled={!isActive} type="primary">
        Stop Event
      </Button>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
}

export { Timer };

