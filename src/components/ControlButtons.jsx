import { FaPlay, FaPause, FaUndo, FaForward } from 'react-icons/fa';

const ControlButtons = ({ isRunning, onToggle, onReset, onSkip, theme }) => {
  return (
    <div className="control-buttons">
      <button className={`control-button reset ${theme}`} onClick={onReset}>
        <FaUndo />
      </button>
      <button
        className={`control-button play-pause ${theme}`}
        onClick={onToggle}
      >
        {isRunning ? <FaPause /> : <FaPlay />}
      </button>
      <button className={`control-button skip ${theme}`} onClick={onSkip}>
        <FaForward />
      </button>
    </div>
  );
};

export default ControlButtons;
