import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";
import { useAppReducer, useItems } from "../AppContext";
import Progress from "./Progress.jsx";
import Item from "./item.jsx";
import styles from "./ItemList.module.css";
import arrow from "../img/arrow.svg";
import alldone from "../img/alldone.svg";

function ItemList() {
  const dispatch = useAppReducer();
  const { pending, paused, completed } = useItems();

  return (
    <div className={styles.itemListContainer}>
      <Progress />

      {pending.length === 0 && completed.length === 0 && paused.length === 0 ? (
        <div className={styles.alldone}>
          <img src={alldone} alt="All tasks are done!" />
          <p>You&apos;re all clear! Add a new task to get started.</p>
        </div>
      ) : (
        <>
          {pending.map((item) => (
            <Item item={item} key={item.key} />
          ))}
        </>
      )}

      <Accordion collapsible multiple>
        {paused.length > 0 && (
          <AccordionItem>
            <AccordionButton className={`${styles.toggle} neumorphic`}>
              <img src={arrow} alt="Toggle Paused Items" />
              <span>Paused</span>
            </AccordionButton>
            <AccordionPanel className={styles.panel}>
              {paused.map((item) => (
                <Item item={item} key={item.key} />
              ))}
            </AccordionPanel>
          </AccordionItem>
        )}
        {completed.length > 0 && (
          <AccordionItem>
            <AccordionButton className={`${styles.toggle} neumorphic`}>
              <img src={arrow} alt="Toggle Completed Items" />
              <span>Completed</span>
            </AccordionButton>
            <AccordionPanel className={styles.panel}>
              {completed.map((item) => (
                <Item item={item} key={item.key} />
              ))}
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>

      {(completed.length > 0 || paused.length > 0) && (
        <div className={styles.reset}>
          <button
            onClick={() => {
              // eslint-disable-next-line no-alert
              if (confirm("Are you sure you want to reset your progress?")) {
                dispatch({ type: "RESET_ALL" });
              }
            }}
          >
            Reset Progress
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemList;
