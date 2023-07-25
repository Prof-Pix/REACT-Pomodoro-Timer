import { useEffect, useState, useRef } from "react";
import { PiBooksThin } from "react-icons/pi";
import { IoFastFood } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import TimerComponent from "./components/TimerComponent";

function App() {
  const [time, setTime] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(true);

  const [studyTimeLaps, setStudyTimeLaps] = useState(0);
  const [breakTimeLaps, setBreakTimeLaps] = useState(0);

  const studyInputRef = useRef();
  const breakInputRef = useRef();

  const isInitialRun = useRef(true);

  const [studyTime, setStudyTime] = useState("");
  const [breakTime, setBreakTime] = useState("");

  const handleStartStop = (event) => {
    event.preventDefault();
    setIsActive((prevActive) => !prevActive);
    setStudyTime(studyInputRef.current.value * 60);
    setBreakTime(breakInputRef.current.value * 60);
  };

  const handleReset = () => {
    isInitialRun.current = true;
    setStudyTimeLaps(0);
    setBreakTimeLaps(0);
    setIsActive(false);
    setBreakTime(true);
    setTime(0);
    studyInputRef.current.value = "";
    breakInputRef.current.value = "";
  };

  useEffect(() => {
    let intervalId;

    if (isActive && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      //When this condition is met, call break time or study time
      setIsBreak((prevIsBreak) => !prevIsBreak);
      setTime(isBreak ? studyTime : breakTime);

      if (!isInitialRun.current) {
        isBreak
          ? setBreakTimeLaps((prevBreakLap) => prevBreakLap + 1)
          : setStudyTimeLaps((prevStudyLap) => prevStudyLap + 1);
      }

      if (isInitialRun.current) {
        isInitialRun.current = false;
      }
    }

    return () => clearInterval(intervalId);
  }, [time, isBreak, isActive, studyTime, breakTime]);

  return (
    <>
      <div
        className="d-flex flex-column"
        style={{ width: "25em", margin: "0 auto" }}
      >
        <div className="d-flex justify-content-center p-3">
          <h1 className="h2">Pomodoro Timer</h1>
        </div>
        <div>
          <h6 style={{ textAlign: "center" }}>
            Note: Edits on the timer will apply after you finish atleast one of
            the time you set.
          </h6>
        </div>
        <form
          className="form-control"
          onSubmit={(event) => handleStartStop(event)}
        >
          <label htmlFor="studytimeinput" className="form-label">
            Enter Study Time
          </label>
          <input
            id="studytimeinput"
            ref={studyInputRef}
            type="number"
            placeholder="Enter Time (in minutes)"
            max={60}
            min={1}
            className="form-control"
            required
            disabled={isActive}
          />
          <br />
          <label htmlFor="breaktimeinput" className="form-label">
            Enter Break Time
          </label>
          <input
            id="breaktimeinput"
            ref={breakInputRef}
            type="number"
            placeholder="Enter Time (in minutes)"
            max={60}
            min={1}
            className="form-control"
            required
            disabled={isActive}
          />
          <div className="p-4 d-flex flex-column justify-content-center">
            <button
              className={isActive ? "btn btn-success" : "btn btn-primary"}
              type="submit"
            >
              {isActive ? "Pause/Edit" : "Start"}
            </button>
            <button
              className="btn btn-danger mt-1"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="d-flex align-items-center flex-column ">
          {isInitialRun.current && (
            <>
              <h3>STARTING IN:</h3>
              <TimerComponent secondsTime={time} />
            </>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <h3>
            {!isInitialRun.current &&
              (isBreak ? (
                <>
                  <IoFastFood />
                  &nbsp; Break Time &nbsp;
                  <IoFastFood />
                </>
              ) : (
                <>
                  <PiBooksThin />
                  &nbsp; STUDY TIME &nbsp;
                  <PiBooksThin />
                </>
              ))}
          </h3>
        </div>
        <div className="timer">
          {!isInitialRun.current && (
            <TimerComponent
              secondsTime={time}
              isActive={isActive}
              isBreak={isBreak}
            />
          )}
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Study Time Laps</th>
                <th scope="col">Break Time Laps:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Count</th>
                <td>{studyTimeLaps}</td>
                <td>{breakTimeLaps}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
