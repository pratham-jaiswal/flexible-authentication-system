import React from 'react';
import { isEmailValid } from '../utils/register.utils.js';

const EmailValidation = ({ email }) => (
  <div className={ isEmailValid(email) ? 'completeValid' : 'notCompleteValid' }>
    {isEmailValid(email) ? <span className="valid"><i class="fa-regular fa-circle-check"></i> Valid Email</span> : <span className="inValid"><i class="fa-regular fa-circle-xmark"></i> Valid Email</span>}
  </div>
);

export default EmailValidation;