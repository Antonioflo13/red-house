import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Grid from "./pages/grid";

import styles from "./App.module.css";

function App() {
  return (
    <div className="App">
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grid" element={<Grid />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
