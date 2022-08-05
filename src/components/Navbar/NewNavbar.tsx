import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import signOutBtn from "../../Image/Menu.svg";

import { removeFromStorage, getFromStorage } from "../../utils/helpers";

import classes from "./styles.module.css";

export default function NewNavbar() {
  const [statusAuth, setStatusAuth] = useState(false);

  let navigate = useNavigate();

  function redirectToLoginPage() {
    navigate(`/login`);
  }

  function redirectToMainPage() {
    navigate("/home");
  }

  const outLogin = () => {
    removeFromStorage("isAuth");
    redirectToLoginPage();
  };

  const takeInfoUser = getFromStorage("userName");

  if (takeInfoUser) {
    var UserName = JSON.parse(takeInfoUser);
  }

  const takeInfoAboutAuth = () => {
    const statusAuth = getFromStorage("isAuth");
    statusAuth ? setStatusAuth(true) : setStatusAuth(false);
  };

  useEffect(() => {
    takeInfoAboutAuth();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.leftTextNav}>
        {statusAuth ? (
          <div onClick={redirectToMainPage}>Hello, {UserName}</div>
        ) : (
          <div onClick={redirectToLoginPage}>Log In</div>
        )}
      </div>
      <div className={classes.rigthWrapper}>
        {statusAuth && (
          <>
            <div onClick={outLogin}>
              <p className={classes.rightTextNav}>Log Out</p>{" "}
              <img src={signOutBtn} alt="/" className={classes.imgLogOut} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
