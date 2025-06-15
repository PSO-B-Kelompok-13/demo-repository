import PropTypes from "prop-types";
import { useAppReducer } from "../AppContext";
import styles from "./Item.module.css";

function Item({ item }) {
  const dispatch = useAppReducer();
  const { text, status } = item;
  const isCompleted = status === "completed";

  const getStatusClass = () => {
    if (status === "completed") return styles.completed;
    if (status === "paused") return styles.paused;
    return "";
  };
  
  function deleteItem() {
    dispatch({ type: "DELETE_ITEM", item });
  }

  function pauseItem() {
    const pausedItem = { ...item, status: "paused" };
    dispatch({ type: "UPDATE_ITEM", item: pausedItem });
  }

  function resumeItem() {
    const pendingItem = { ...item, status: "pending" };
    dispatch({ type: "UPDATE_ITEM", item: pendingItem });
  }

  function completeItem() {
    const completedItem = { ...item, status: "completed" };
    dispatch({ type: "UPDATE_ITEM", item: completedItem });
  }

  return (
    <div className={`${styles.item} neumorphic ${getStatusClass()}`}>
      <span className={styles.itemName}>{text}</span>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.complete} neumorphic`}
          onClick={completeItem}
          title="Complete"
          disabled={isCompleted}
        >
          ✓
        </button>
        <button
          className={`${styles.button} ${styles.pause} neumorphic`}
          onClick={status === 'pending' ? pauseItem : resumeItem}
          title={status === 'pending' ? 'Pause' : 'Resume'}
          disabled={isCompleted}
        >
          {status === 'pending' ? '❚❚' : '▶'}
        </button>
        <button
          className={`${styles.button} ${styles.delete} neumorphic`}
          onClick={deleteItem}
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'paused', 'completed']).isRequired,
    key: PropTypes.number.isRequired,
  }).isRequired,
};

export default Item;