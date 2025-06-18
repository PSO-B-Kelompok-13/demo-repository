import PropTypes from "prop-types";
import { useAppState } from "../AppContext";
import useDateCheck from "../hooks/useDateCheck.js";
import PomodoroTimer from "./PomodoroTimer";
import styles from "./TodoDate.module.css";

function TodoDate({ toggleTheme, currentTheme }) {
  const { date } = useAppState();
  useDateCheck();

  return (
    <div className={`${styles.headerPanel} neumorphic`}>
      <div className={styles.dateSection}>
        <div className={styles.day}>{date.dayDisplay}</div>
        <div className={styles.monthYear}>
          <div>{date.monthDisplay}</div>
          <div>{date.year}</div>
        </div>
      </div>
      <div className={styles.weekday}>{date.weekday}</div>
      
      <button
        onClick={toggleTheme}
        className={`${styles.themeToggle} theme-toggle-button neumorphic`}
        title="Toggle Theme"
      >
        {currentTheme === "light" ? "🌙" : "☀️"}
      </button>
      
      <div className={styles.pomodoroContainer}>
        <PomodoroTimer />
      </div>
    </div>
  );
}

TodoDate.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  currentTheme: PropTypes.string.isRequired,
};

export default TodoDate;