import { Routes, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

import Header from "./components/Header";
import Home from "./pages/Home";
import Grid from "./pages/grid";

import styles from "./App.module.css";

function App() {
  return (
    <div className="App">
      <ParallaxProvider>
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
      </ParallaxProvider>
    </div>
  );
}

export default App;
