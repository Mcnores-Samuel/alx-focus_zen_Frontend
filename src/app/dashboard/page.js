"use client";
import { useState, useEffect } from 'react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60); // Reset time for work or break
  };

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);

      // If the current session was work, start a break, otherwise, start work
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(5 * 60); // Set break time to 5 minutes
      } else {
        setIsBreak(false);
        setCyclesCompleted(cyclesCompleted + 1);
        setTimeLeft(25 * 60); // Set work time to 25 minutes
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, cyclesCompleted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="pomodoro-timer">
      <h2>{isBreak ? 'Break Time' : 'Work Time'}</h2>
      <p>{formatTime(timeLeft)}</p>
      <button onClick={startTimer} disabled={isActive}>Start</button>
      <button onClick={stopTimer} disabled={!isActive}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
      <p>Cycles Completed: {cyclesCompleted}</p>
    </div>
  );
}
