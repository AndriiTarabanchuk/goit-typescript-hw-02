// import React, { FC } from 'react'
import css from "./ErrorMessage.module.css";

import { message } from "../services/const";

interface PropsErrorMessage {
  messageError: string;
}

const ErrorMessage: React.FC<PropsErrorMessage> = ({ messageError }) => {
  return (
    <div className={css.errorMessage}>
      {messageError === message.errorFetch ? (
        <h2>{messageError}</h2>
      ) : (
        <p>No error message provided.</p>
      )}
    </div>
  );
};

export default ErrorMessage;
