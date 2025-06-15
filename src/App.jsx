import { useState, useEffect } from "react";
import "./App.css";
import TodoDate from "./components/TodoDate";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import { AppStateProvider } from "./AppContext";

function App() {
  const [theme, setTheme] = useState("dark");
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    document.body.className = theme === "light" ? "light-mode" : "";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <AppStateProvider>
      <div className="App">
        <TodoDate toggleTheme={toggleTheme} currentTheme={theme} />
        <ItemList />

        <button 
          className="fab neumorphic" 
          onClick={() => setFormVisible(true)} 
          title="Add New Item"
        >
          +
        </button>

        {isFormVisible && <AddItemForm onClose={() => setFormVisible(false)} />}
      </div>
    </AppStateProvider>
  );
}

export default App;