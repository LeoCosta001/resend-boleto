import React from 'react';
import { connect } from 'react-redux';
import InputCheckbox from '../Inputs/InputCheckbox';

/*******
 * CSS *
 *******/
import css from './ResendBoletoOptions.module.scss';

const ResendBoletoOptions = ({ optionsValue, dispatch }) => {
  function attOptionsValue(newValue) {
    dispatch({
      type: 'FORM_RESEND_BOLETO_OPTIONS',
      optionsValue: { ...optionsValue, ...newValue },
    });
  }

  return (
    <div className={css.main}>
      <InputCheckbox
        label="Enviar o boleto para o Email do assinante."
        type="checkbox"
        name="useSubscriptionEmailToSend"
        id="useSubscriptionEmailToSend"
        setFormValue={attOptionsValue}
        formValue={optionsValue}
      />
    </div>
  );
};
export default connect((state) => ({
  optionsValue: { ...state.getResendBoletoOptions.optionsValue },
}))(ResendBoletoOptions);
