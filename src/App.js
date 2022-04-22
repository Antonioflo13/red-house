import { Routes, Route, useLocation } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

import Header from "./components/Header";
import Home from "./pages/Home";
import Grid from "./pages/grid";
import SuccessPayment from "./pages/SuccessPayment";
import Login from "./pages/Login";

import styles from "./App.module.css";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ParallaxProvider>
        <div className={styles.container}>
          {location.pathname !== "/success" && location.pathname !== "/login" && (
            <div className={styles.header}>
              <Header />
            </div>
          )}
          <div className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/grid" element={<Grid />} />
              <Route path="/success" element={<SuccessPayment />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </ParallaxProvider>
    </div>
  );
}

export default App;
