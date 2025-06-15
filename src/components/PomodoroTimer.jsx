import { useState, useEffect } from 'react';
import styles from './PomodoroTimer.module.css';

function PomodoroTimer() {
  const [minutesInput, setMinutesInput] = useState(25);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [activePreset, setActivePreset] = useState('pomodoro');

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [isRunning, timeLeft]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  const handleStart = () => {
    const newInitialTime = minutesInput * 60;
    if (newInitialTime > 0) {
      setInitialTime(newInitialTime);
      setTimeLeft(newInitialTime);
      setIsRunning(true);
    }
  };

  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };
  const handleResume = () => setIsRunning(true);

  const handleDecrement = () => {
    setMinutesInput((prev) => (prev > 1 ? prev - 1 : 1));
    setActivePreset('custom');
  };

  const handleIncrement = () => {
    setMinutesInput((prev) => prev + 1);
    setActivePreset('custom');
  };

  const handlePresetClick = (preset, minutes) => {
    setActivePreset(preset);
    setMinutesInput(minutes);
  };

  const isPaused = !isRunning && timeLeft < initialTime;

  return (
    <div className={styles.timerContainer}>
      {isRunning || isPaused ? (
        <div className={styles.pomodoroRunning}>
          <div className={styles.timerDisplay}>{formatTime(timeLeft)}</div>
          <div className={styles.buttonGroup}>
            {isRunning && <button onClick={handlePause} className="neumorphic">Pause</button>}
            {isPaused && <button onClick={handleResume} className="neumorphic">Resume</button>}
            <button onClick={handleReset} className="neumorphic">Reset</button>
          </div>
        </div>
      ) : (
        <div className={styles.pomodoroInput}>
          <div className={styles.presetGroup}>
            <button 
              onClick={() => handlePresetClick('pomodoro', 25)}
              className={`${styles.presetButton} ${activePreset === 'pomodoro' ? styles.active : ''}`}
            >
              Pomodoro
            </button>
            <button 
              onClick={() => handlePresetClick('short', 5)}
              className={`${styles.presetButton} ${activePreset === 'short' ? styles.active : ''}`}
            >
              Short Break
            </button>
            <button 
              onClick={() => handlePresetClick('long', 15)}
              className={`${styles.presetButton} ${activePreset === 'long' ? styles.active : ''}`}
            >
              Long Break
            </button>
          </div>

          <div className={styles.inputControlPanel}>
            <button onClick={handleDecrement} className={`${styles.adjustButton} neumorphic`}>-</button>
            <div className={`${styles.timeDisplay} neumorphic--inset`}>{minutesInput}</div>
            <button onClick={handleIncrement} className={`${styles.adjustButton} neumorphic`}>+</button>
          </div>
          <div className={styles.minutesLabel}>(minutes)</div>
          <button onClick={handleStart} className={`${styles.startButton} neumorphic`}>Start</button>
        </div>
      )}
    </div>
  );
}

export default PomodoroTimer;
