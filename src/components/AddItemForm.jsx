import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useAppReducer } from "../AppContext";
import styles from "./AddItemForm.module.css";

function AddItemForm({ onClose }) {
  const dispatch = useAppReducer();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function addItem(e) {
    e.preventDefault();
    const newItemText = inputRef.current.value.trim();
    if (newItemText) {
      const newItem = {
        text: newItemText,
        key: Date.now(),
        status: "pending",
      };
      dispatch({ type: "ADD_ITEM", item: newItem });
      onClose();
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} title="Close">
          &times;
        </button>
        <h3>Add a New Task</h3>
        <form className={styles.form} onSubmit={addItem}>
          <input
            ref={inputRef}
            placeholder="What do you need to do?"
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

AddItemForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddItemForm;