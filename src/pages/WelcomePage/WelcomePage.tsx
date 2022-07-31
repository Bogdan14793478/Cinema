import React from "react";
import { useNavigate } from "react-router-dom";

import backImg from "../../Image/backgroundForRegister.jpg";

import classes from "./styles.module.css";

const WelcomePage = () => {
  let navigate = useNavigate();

  function redirectToRegisterPage() {
    navigate(`/register`);
  }

  function redirectToLoginPage() {
    navigate(`/login`);
  }

  function redirectToHomePage() {
    navigate(`/home`);
  }

  return (
    <div className={classes.container}>
      <img src={backImg} alt="/" className={classes.backFont} />
      <div className={classes.form}>
        <h3>Choose your way</h3>
        <div className={classes.positionBtn}>
          <button className={classes.button} onClick={redirectToLoginPage}>
            Login
          </button>

          <button className={classes.button} onClick={redirectToRegisterPage}>
            Register
          </button>
          <button className={classes.button} onClick={redirectToHomePage}>
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
