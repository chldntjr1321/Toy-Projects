import { useState, useEffect } from 'react';
import './App.css';

function App() {
  //시계 선 긋기
  const lines = Array.from({ length: 30 }, (_, i) => {
    const isThick = i % 5 === 0;
    const style = { transform: `rotate(${i * 6}deg)` };
    const className = `line${isThick ? ' thick' : ''}`;
    return <div key={i} className={className} style={style}></div>;
  });
  //시계 숫자 그리기
  const nums = Array.from({ length: 6 }, (_, i) => {
    const left = 45 + 5 * i;
    const right = 15 + 5 * i;
    const leftText = left >= 60 ? left - 60 : left;
    const rightText = right;
    return (
      <div
        key={i}
        className="num-box"
        style={{ transform: `rotate(${i * 30}deg)` }}
      >
        <span style={{ transform: `rotate(${-30 * i}deg)` }}>{leftText}</span>
        <span style={{ transform: `rotate(${-30 * i}deg)` }}>{rightText}</span>
      </div>
    );
  });

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [endTime, setEndTime] = useState(60);
  const fins = [];
  for (let min = 0; min < endTime; min++) {
    for (let sec = 0; sec < 60; sec++) {
      const totalSec = min * 60 + sec;
      const reverseMin = endTime - min - 1;
      const deg = reverseMin * 6 + (60 - sec) * 0.1;
      if (totalSec >= elapsedSec) {
        fins.push(
          <div
            key={`${min}-${sec}`}
            className="fin"
            style={{ transform: `rotate(${-deg}deg)` }}
          />
        );
      }
    }
  }
  const handleToggle = () => {
    setIsRunning((prev) => !prev);
  };
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="background">
      <div className="apptitle">60분 뽀모도로 타이머</div>
      <div className="playbtn">
        <span onClick={handleToggle}>{isRunning ? '⏸️' : '▶️'}</span>
        <span
          onClick={() => {
            setEndTime(60);
            setElapsedSec(0);
          }}
        >
          🔄
        </span>
      </div>
      <div className="clockbox">
        <div className="clock__original">
          <div className="timer" id="lines">
            {lines}
            {nums}
            {fins}
            <div className="cover1"></div>
            <div className="cover2"></div>
          </div>
        </div>
        <div className="clock__digital">
          {String(Math.floor((endTime * 60 - elapsedSec) / 60)).padStart(
            2,
            '0'
          )}
          :{String((endTime * 60 - elapsedSec) % 60).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

export default App;
