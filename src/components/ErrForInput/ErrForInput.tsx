import React from "react";
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

import classes from "./styles.module.css";

interface Props {
  err: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>> | undefined;
}

const ErrForInput: React.FC<Props> = ({ err }) => {
  return (
    <>
      {err && (
        <p role="alert" className={classes.error}>
          {err.message || "Error!"}
        </p>
      )}
    </>
  );
};

export default ErrForInput;
