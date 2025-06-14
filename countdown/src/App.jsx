import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleStart = () => {
    // if (hours < 0 || mins < 0 || seconds < 0) {
    //   alert("Invalid input!");
    //   return;
    // }
    setIsStart(true);
  };

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  };

  const handleResume = () => {
    setIsPaused(false);
    runTimer(seconds, mins, hours, timerId);
  };
  const handleReset = () => {
    setIsStart(false);
    setHours(0);
    setMins(0);
    setSeconds(0);
  };

  const handleChange = (e) => {
    const id = e.target.id;
    if (id === "hours") {
      setHours(e.target.value);
    } else if (id === "mins") {
      setMins(e.target.value);
    } else {
      setSeconds(e.target.value);
    }
  };
  console.log(hours, mins, seconds, "testing");

  function runTimer(sec, min, hr, tid) {
    if (sec > 0) {
      setSeconds((currentState) => currentState - 1);
    } else if (sec === 0 && min > 0) {
      setMins((currentMin) => currentMin - 1);
      setSeconds(59);
    } else {
      setHours((currentHours) => currentHours - 1);
      setMins(59);
      setSeconds(59);
    }
    if (sec === 0 && min === 0 && hr === 0) {
      setHours(0);
      setMins(0);
      setSeconds(0);
      clearInterval(tid);
      alert("Timer is finished!");
    }
  }
  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, mins, hours, tid);
      }, 1000);
    }
    setTimerId(tid);
    return () => {
      return clearInterval(tid);
    };
  }, [isStart, hours, mins, seconds]);
  return (
    <>
      <div>
        <div className="input-container">
          <h1>Timer Countdown</h1>
          {!isStart && (
            <>
              <div className="input-timers">
                <input placeholder="HH" id="hours" onChange={handleChange} />
                <input placeholder="MM" id="mins" onChange={handleChange} />
                <input placeholder="SS" id="seconds" onChange={handleChange} />
              </div>
              <button className="timer-btn" onClick={handleStart}>
                Start
              </button>
            </>
          )}
          {isStart && (
            <div className="timer-container">
              <div className="timer-counter">
                <div>{hours}</div>
                <span>:</span>
                <div>{mins}</div>
                <span>:</span>
                <div>{seconds}</div>
              </div>
              <div>
                {isPaused && (
                  <button className="timer-btn" onClick={handleResume}>
                    Resume
                  </button>
                )}
                {!isPaused && (
                  <button className="timer-btn" onClick={handlePause}>
                    Pause
                  </button>
                )}
                <button className="timer-btn" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
