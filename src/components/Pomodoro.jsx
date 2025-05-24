import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TimerDisplay from './TimerDisplay';
import ControlButtons from './ControlButtons';
import { playNotificationSound } from '../utils';

const SECONDS_IN_MINUTE = 60;
const WORK_TIME = 25 * SECONDS_IN_MINUTE;
const BREAK_TIME = 5 * SECONDS_IN_MINUTE;

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const calculateProgress = () => {
    const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
  };

  const skipTimer = () => {
    setIsRunning(false);
    setIsBreak(!isBreak);
    setTimeLeft(!isBreak ? BREAK_TIME : WORK_TIME);
  };

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playNotificationSound();
      setIsBreak(!isBreak);
      setTimeLeft(!isBreak ? BREAK_TIME : WORK_TIME);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const theme = isBreak ? 'break-mode' : 'work-mode';

  return (
    <div className={`background ${theme}`}>
      <div className="pomodoro">
        <div className="progress-wrapper">
          <CircularProgressbar
            value={calculateProgress()}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: 'round',
              pathTransitionDuration: 0.5,
              pathColor: isBreak
                ? 'var(--break-primary)'
                : 'var(--work-primary)',
              trailColor: '#f5f5f5',
            })}
          />
        </div>
        <h2 className="timer-label">{isBreak ? 'Break' : 'Work'} Time</h2>
        <TimerDisplay minutes={minutes} seconds={seconds} theme={theme} />
        <ControlButtons
          isRunning={isRunning}
          onToggle={toggleTimer}
          onReset={resetTimer}
          onSkip={skipTimer}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default Pomodoro;
