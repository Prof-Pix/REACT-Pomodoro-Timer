import React from "react";
import "../styles/TimerComponent.css";

const TimerComponent = ({ secondsTime, isActive, isBreak }) => {
  const timerMinutes = Math.floor(secondsTime / 60);
  const timerSeconds = secondsTime % 60;

  return (
    <>
      <div className="main-container form-control">
        <div className={isBreak ? "break" : "active"}>
          {timerMinutes.toString().padStart(2, "0")}
        </div>
        <div id="colon">:</div>
        <div className={isBreak ? "break" : "active"}>
          {timerSeconds.toString().padStart(2, "0")}
        </div>
      </div>
    </>
  );
};

export default TimerComponent;
