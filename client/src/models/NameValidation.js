import React from 'react';
import { isNameValid } from '../utils/register.utils.js';

const NameValidation = ({ name }) => (
  <div className={ isNameValid(name) ? 'completeValid' : 'notCompleteValid' }>
    {isNameValid(name) ? <span className="valid"><i class="fa-regular fa-circle-check"></i> Name should have atleast one alphabet</span> : <span className="inValid"><i class="fa-regular fa-circle-xmark"></i> Name should have atleast one alphabet</span>}
  </div>
);

export default NameValidation;