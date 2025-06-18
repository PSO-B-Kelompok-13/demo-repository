import { useAppState } from "../AppContext";
import useDateCheck from "../hooks/useDateCheck.js";
import PomodoroTimer from "./PomodoroTimer";
import styles from "./TodoDate.module.css";

function TodoDate() {
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
      {/* Dark mode toggle button has been removed as part of rollback. */}
      <div className={styles.pomodoroContainer}>
        <PomodoroTimer />
      </div>
    </div>
  );
}

export default TodoDate;
