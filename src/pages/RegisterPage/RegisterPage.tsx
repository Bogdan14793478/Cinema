import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import backImg from "../../Image/backgroundForRegister.jpg";

import { notifySuccess, passwordExp, setToStorage } from "../../utils/helpers";

import classes from "./styles.module.css";

const RegisterPage = () => {
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

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
    startRegistr(JSON.stringify(data));
    notifySuccess("You are register");
    reset();
  };

  return (
    <div className={classes.container}>
      <img src={backImg} alt="/" className={classes.backFont} />
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <h3>Register</h3>

          <label
            className={
              errors.name
                ? [classes.label, classes.labelError].join(" ")
                : classes.label
            }
            htmlFor="name"
          >
            Name:
            <input
              className={
                errors.name
                  ? [classes.input, classes.inputError].join(" ")
                  : classes.input
              }
              {...register("name", {
                required: "Required",
              })}
            />
          </label>
          <div className={classes.errMessage}>
            {errors?.name && (
              <p role="alert" className={classes.error}>
                {errors?.name?.message || "Error!"}
              </p>
            )}
          </div>

          <label
            className={
              errors.email
                ? [classes.label, classes.labelError].join(" ")
                : classes.label
            }
            htmlFor="email"
          >
            Email:
            <input
              type="email"
              className={
                errors.email
                  ? [classes.input, classes.inputError].join(" ")
                  : classes.input
              }
              {...register("email", {
                required: "Required",
              })}
            />
          </label>
          <div className={classes.errMessage}>
            {errors?.email && (
              <p role="alert" className={classes.error}>
                {errors?.email?.message || "Error!"}
              </p>
            )}
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
            <input
              className={
                errors.password
                  ? [classes.input, classes.inputError].join(" ")
                  : classes.input
              }
              type="password"
              {...register("password", {
                required: "Required",
                minLength: {
                  value: 6,
                  message:
                    "Password length - 6, must have one uppercase, lowercase, number",
                },
                maxLength: {
                  value: 6,
                  message:
                    "Password length - 6, must have one uppercase, lowercase, number",
                },
                pattern: passwordExp,
              })}
            />
          </label>
          <div className={classes.errMessage}>
            {errors?.password && (
              <p role="alert" className={classes.error}>
                {errors?.password?.message || "Error!"}
              </p>
            )}
          </div>

          <button className={classes.button} type="submit">
            Register
          </button>
          <button className={classes.button} onClick={redirectToLoginPage}>
            Redirect to Login page
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
