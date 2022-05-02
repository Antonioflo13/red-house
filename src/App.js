import { Routes, Route, useLocation } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

import Header from "./components/Header";
import Home from "./pages/Home";
import Grid from "./pages/grid";
import SuccessPayment from "./pages/SuccessPayment";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import styles from "./App.module.css";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ParallaxProvider>
        <div className={styles.container}>
          {location.pathname === "/" && (
            <div className={styles.header}>
              <Header />
            </div>
          )}
          <div className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/grid" element={<Grid />} />
              <Route path="/success" element={<SuccessPayment />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              <Route path="/password-reset" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </ParallaxProvider>
    </div>
  );
}

export default App;
