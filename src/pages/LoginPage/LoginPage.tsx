import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ErrForInput from "../../components/ErrForInput/ErrForInput";
import Input from "../../components/Input/input";
import leftImg from "../../Image/img.svg";
import showPass from "../../Image/showPass.svg";

import {
  getFromStorage,
  notifyError,
  notifySuccess,
  setToStorage,
} from "../../utils/helpers";

import classes from "./styles.module.css";

const LoginPage = () => {
  const [statePass, setStatePass] = useState(false);

  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function redirectToRegisterPage() {
    navigate(`/register`);
  }

  function redirectToMainPage() {
    navigate(`/home`);
  }

  function deepEqual(obj1: string, obj2: string) {
    return obj1 === obj2;
  }

  function startLogin(values: string) {
    const infoAboutRegister = getFromStorage("isRegister");
    let identity;
    if (!infoAboutRegister) {
      notifyError("You need to registry first");
    }
    if (infoAboutRegister) {
      identity = deepEqual(values, infoAboutRegister);
    }
    if (!identity) {
      notifyError("No correct email or password");
    }
    if (identity) {
      setToStorage(true, "isAuth");
      notifySuccess("You logIn");
      redirectToMainPage();
    }
  }

  const onSubmit = (data: FieldValues) => {
    startLogin(JSON.stringify(data));
    reset();
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <img src={leftImg} alt="/" className={classes.imgLeft} />
        <p className={classes.textLeft}>Welcome to the team</p>
      </div>
      <div className={classes.rightSide}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.rightForm}>
          <h3 className={classes.titleRight}>Sign In</h3>
          <label
            className={
              errors.email
                ? [classes.label, classes.labelError].join(" ")
                : classes.label
            }
            htmlFor="email"
          >
            Email:
            <Input typeInput="email" err={errors.email} register={register} />
          </label>
          <div className={classes.errMessage}>
            <ErrForInput err={errors.email} />
          </div>

          <label
            className={
              errors.password
                ? [classes.label, classes.labelError].join(" ")
                : classes.label
            }
            htmlFor="password"
          >
            Password:
            <div className={classes.passwordInp}>
              <Input
                typeInput={statePass ? "text" : "password"}
                err={errors.password}
                register={register}
              />
              <img
                onClick={() => setStatePass(!statePass)}
                src={showPass}
                alt="/"
                className={classes.showPassImg}
              />
            </div>
          </label>

          <div className={classes.errMessage}>
            <ErrForInput err={errors.password} />
          </div>

          <button
            className={[classes.button, classes.buttonSubmit].join(" ")}
            type="submit"
          >
            Sign In
          </button>
          <div className={classes.redirectBtn} onClick={redirectToRegisterPage}>
            <p>Don't have an account? </p>
            <p className={classes.registerBtn}> Register</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
