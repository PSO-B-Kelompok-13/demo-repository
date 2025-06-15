import { useItems, useAppState } from "../AppContext";
import styles from "./Progress.module.css";

function Progress() {
  const { items } = useAppState();
  const totalAmount = items.length;
  const { completed, paused } = useItems();

  const completedAmount = completed.length;
  const pausedAmount = paused.length;

  const completedPercentage = totalAmount > 0 ? (completedAmount / totalAmount) * 100 : 0;
  const pausedPercentage = totalAmount > 0 ? (pausedAmount / totalAmount) * 100 : 0;

  const pausedAndCompletedPercentage = completedPercentage + pausedPercentage;

  return (
    <div className={styles.progressContainer}>
      <span className={styles.progressLabel}>Progress</span>
      <div className={`${styles.progressBar} neumorphic--inset`}>
        <div 
          className={styles.progressFillPaused} 
          style={{ width: `${pausedAndCompletedPercentage}%` }} 
        />
        <div 
          className={styles.progressFillCompleted} 
          style={{ width: `${completedPercentage}%` }} 
        />
      </div>
      <span className={styles.progressValue}>{completedAmount} / {totalAmount}</span>
    </div>
  );
}

export default Progress;