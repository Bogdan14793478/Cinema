import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import ErrForInput from "../../components/ErrForInput/ErrForInput";
import Input from "../../components/Input/input";
import leftImg from "../../Image/img.svg";
import showPass from "../../Image/showPass.svg";

import { fromBinary } from "../../utils/base64";
import { passwordExp } from "../../utils/helpers";
import {
  getFromStorage,
  notifyError,
  notifySuccess,
  setToStorage,
} from "../../utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";

import classes from "./styles.module.css";

const schema = yup.object().shape({
  email: yup.string().email().required("It`s required field"),
  password: yup
    .string()
    .min(6)
    .max(6)
    .matches(
      passwordExp,
      "Password length - 6, must have one uppercase, lowercase, number"
    )
    .required("It`s required field"),
});

const LoginPage = () => {
  const [statePass, setStatePass] = useState(false);

  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      const data = JSON.parse(infoAboutRegister);
      const decodePass = fromBinary(data.password);
      data.password = decodePass;
      const registerData = JSON.stringify(data);
      identity = deepEqual(values, registerData);
      console.log(identity, "identity");
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
            Email: *
            <Input
              typeInput="text"
              err={errors.email}
              register={register}
              type="email"
            />
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
            Password: *
            <div className={classes.passwordInp}>
              <Input
                typeInput={statePass ? "text" : "password"}
                err={errors.password}
                register={register}
                type="password"
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
