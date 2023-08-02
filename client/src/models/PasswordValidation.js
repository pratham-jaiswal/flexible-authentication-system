import React from 'react';
import { isPassEightChars, hasPassUpperCase, hasPassLowerCase, hasPassNumber, hasPassSymbol, isValidPassword } from '../utils/register.utils.js';

const validationCriterias = [
  "Password must contain atleast 8 characters",
  "Password must contain an uppercase letter",
  "Password must contain a lowercase letter",
  "Password must contain a number",
  "Password must contain a symbol"
]

const EmailValidation = ({ password }) => (
  <div className={ isValidPassword(password) ? 'completeValid' : 'notCompleteValid' }>
    <p>{isPassEightChars(password) ? <span className="valid"><i className="fa-regular fa-circle-check"></i> { validationCriterias[0] }</span> : <span className="inValid"><i className="fa-regular fa-circle-xmark"></i> { validationCriterias[0] }</span>}</p>

    <p>{hasPassUpperCase(password) ? <span className="valid"><i className="fa-regular fa-circle-check"></i> { validationCriterias[1] }</span> : <span className="inValid"><i className="fa-regular fa-circle-xmark"></i> { validationCriterias[1] }</span>}</p>

    <p>{hasPassLowerCase(password) ? <span className="valid"><i className="fa-regular fa-circle-check"></i> { validationCriterias[2] }</span> : <span className="inValid"><i className="fa-regular fa-circle-xmark"></i> { validationCriterias[2] }</span>}</p>

    <p>{hasPassNumber(password) ? <span className="valid"><i className="fa-regular fa-circle-check"></i> { validationCriterias[3] }</span> : <span className="inValid"><i className="fa-regular fa-circle-xmark"></i> { validationCriterias[4] }</span>}</p>

    <p>{hasPassSymbol(password) ? <span className="valid"><i className="fa-regular fa-circle-check"></i> { validationCriterias[4] }</span> : <span className="inValid"><i className="fa-regular fa-circle-xmark"></i> { validationCriterias[4] }</span>}</p>
  </div>
);

export default EmailValidation;