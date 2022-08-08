import React from "react";
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

import { passwordExp } from "../../utils/helpers";

import classes from "./styles.module.css";

interface Props {
  typeInput: string;
  err: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>> | undefined;
  register: any;
  type?: string;
}

const Input: React.FC<Props> = ({ typeInput, err, register, type }) => {
  return (
    <div>
      <input
        type={typeInput}
        className={
          err ? [classes.input, classes.inputError].join(" ") : classes.input
        }
        {...(typeInput === "password" ||
        (type === "password" && typeInput === "text")
          ? {
              ...register("password", {
                required: "It`s required field",
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
              }),
            }
          : typeInput === "email"
          ? {
              ...register("email", {
                required: "It`s required field",
              }),
            }
          : {
              ...register("name", {
                required: "It`s required field",
              }),
            })}
      />
    </div>
  );
};

export default Input;
