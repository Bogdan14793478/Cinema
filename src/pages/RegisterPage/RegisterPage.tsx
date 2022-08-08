import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import ErrForInput from "../../components/ErrForInput/ErrForInput";
import Input from "../../components/Input/input";
import leftImg from "../../Image/img.svg";
import showPass from "../../Image/showPass.svg";

import { toBinary } from "../../utils/base64";
import { notifySuccess, passwordExp, setToStorage } from "../../utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";

import classes from "./styles.module.css";

const schema = yup.object().shape({
  name: yup.string().min(2).required("It`s required field"),
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

const RegisterPage = () => {
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

  async function redirectToLoginPage() {
    navigate(`/login`);
  }

  async function startRegistr(values: string) {
    const { name, ...info } = JSON.parse(values);
    const userName = JSON.stringify(name);
    const personInfo = JSON.stringify(info);
    setToStorage(userName, "userName");
    setToStorage(personInfo, "isRegister");
    redirectToLoginPage();
  }

  const onSubmit = (data: FieldValues) => {
    const { password } = data;
    let secretPass = toBinary(password);
    data.password = secretPass;
    startRegistr(JSON.stringify(data));
    notifySuccess("You are register");
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <img src={leftImg} alt="/" className={classes.imgLeft} />
        <p className={classes.textLeft}>Welcome to the team</p>
      </div>
      <div className={classes.rightSide}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.rightForm}>
          <h3 className={classes.titleRight}>Create Account</h3>

          <label
            className={
              errors.name
                ? [classes.label, classes.labelError].join(" ")
                : classes.label
            }
            htmlFor="text"
          >
            Name: *
            <Input typeInput="text" err={errors.name} register={register} />
          </label>
          <div className={classes.errMessage}>
            <ErrForInput err={errors.name} />
          </div>

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
          <div className={classes.redirectBtn} onClick={redirectToLoginPage}>
            <p>Already a member? </p>
            <p className={classes.registerBtn}> Sign In</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
