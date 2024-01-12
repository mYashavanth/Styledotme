import { useState } from "react";
import Home from "./Components/Home";
import styles from "./App.module.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={styles.appContainer}>
        <Home />
      </div>
    </>
  );
}

export default App;
