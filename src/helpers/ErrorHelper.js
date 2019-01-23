import React from 'react';
import Translate from "../containers/Translate/Translate";

export default class ErrorHelper {
  static errorSummery(errors, message) {
    return (
      <div>
        <div><strong>{message}</strong></div>
        {Object.keys(errors).map(key => {
          return errors[key].map((error, index) => {
            return <div key={key + index}>{error}</div>;
          });
        })}
      </div>
    );
  }

  static getMessageByError(error) {
    // validation error
    const status = error.response ? error.response.status : 0;

    switch (status) {
      case 422:
        const { errors, message } = error.response.data;
        return ErrorHelper.errorSummery(errors, message);
      case 401:
        return <Translate>ErrorAuth</Translate>;
      default:
        try {
          return error.response ? error.response.data.message : error.message;
        } catch (e) {
          return 'Error';
        }
    }
  }
}