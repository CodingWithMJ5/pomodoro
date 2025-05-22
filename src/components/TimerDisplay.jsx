const TimerDisplay = ({ minutes, seconds, theme }) => {
  return (
    <div className={`timer-display ${theme}`}>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

export default TimerDisplay;
