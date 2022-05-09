import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./store/auth";

import { ParallaxProvider } from "react-scroll-parallax";

import Header from "./components/Header";
import Home from "./pages/Home";
import Grid from "./pages/grid";
import SuccessPayment from "./pages/SuccessPayment";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Idle from "./components/Idle";

import styles from "./App.module.scss";

function App() {
  const [showDialogSessionExpired, setShowDialogSessionExpired] =
    useState(false);
  const [timer, setTimer] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = location;
  let getSessionExpire = localStorage.getItem("expired");
  useEffect(() => {
    if (pathname === "/dashboard") {
      startTimer();
    } else {
      stopTimer(timer);
    }
  }, [getSessionExpire, pathname]);

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        const now = new Date().getTime();
        if (getSessionExpire < now) {
          clearInterval(timer);
          setShowDialogSessionExpired(true);
          dispatch(logout);
          navigate("/signin");
        }
      }, 1000)
    );
  };

  const stopTimer = (timer) => clearInterval(timer);

  const hideDialogSessionExpired = () => setShowDialogSessionExpired(false);

  return (
    <div className="App">
      <Idle
        showDialogSessionExpired={showDialogSessionExpired}
        hideDialogSessionExpired={hideDialogSessionExpired}
      />
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
              {localStorage.getItem("fullName") && (
                <Route path="/dashboard" element={<Dashboard />} />
              )}
            </Routes>
          </div>
        </div>
      </ParallaxProvider>
    </div>
  );
}

export default App;
