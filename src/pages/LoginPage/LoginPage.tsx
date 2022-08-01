import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import backImg from "../../Image/backgroundForRegister.jpg";

import {
  getFromStorage,
  notifyError,
  notifySuccess,
  passwordExp,
  setToStorage,
} from "../../utils/helpers";

import classes from "./styles.module.css";

// const initialValues: AuthFormData = {
//   email: "",
//   password: "",
// };

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email("Enter valid email").required("Required"),
//   password: Yup.string()
//     .min(6, "It`s too short")
//     .max(6, "It`s too long")
//     .matches(
//       passwordExp,
//       "Password length - 6, must have one uppercase, lowercase, number"
//     )
//     .required("Required"),
// });

const LoginPage = () => {
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
      <img src={backImg} alt="/" className={classes.backFont} />
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <h3>Login</h3>
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
          {/* 
          <label className={classes.label} htmlFor="password">
            Password
          </label>
          <input
            className={classes.input}
            type="password"
            placeholder="Password"
            id="password"
            // value={values.password}
            // onChange={handleChange}
          /> */}

          <button className={classes.button} type="submit">
            Login
          </button>
          <button className={classes.button} onClick={redirectToRegisterPage}>
            Not register yet?
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
