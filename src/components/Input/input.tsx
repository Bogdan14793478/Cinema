import React from "react";
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

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
        {...(type === "password"
          ? {
              ...register("password"),
            }
          : type === "email"
          ? {
              ...register("email"),
            }
          : {
              ...register("name"),
            })}
      />
    </div>
  );
};

export default Input;
