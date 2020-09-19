import { combineReducers } from 'redux';

import getRequestState from './requestState';
import getResendBoletoOptions from './resendBoletoOptions';

export default combineReducers({
  getRequestState,
  getResendBoletoOptions,
});
