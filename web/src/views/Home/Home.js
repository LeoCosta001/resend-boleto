import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios/config';
import * as setRequestState from '../../redux/actions/setRequestState';

/***************
 * Componentes *
 ***************/
import TitleDefault from '../../components/Titles/TitleDefault/TitleDefault';
import InputBlock from '../../components/Inputs/InputBlock';
import ButtonDefault from '../../components/Buttons/ButtonDefault/ButtonDefault';
import OneOrAnother from '../../components/Separators/OneOrAnother/OneOrAnother';
import ResendBoletoOptions from '../../components/Home/ResendBoletoOptions';
import RequestState from '../../components/Home/RequestState';

/*******
 * CSS *
 *******/
import '../../style/styles.scss';
import css from './Home.module.scss';
import Head from './Home_head';

const Home = ({ dispatch, loading, status, optionsValue }) => {
  const [formValue, setFormValue] = React.useState({
    // Caso você esteja usando inputs de componentes importados (Ex: 'InputBlock' e 'InputCheckbox') então o nome destas propriedades tem que ter o mesmo ID dos Inputs
    subscriptionEmail: '',
    sendEmail: '',
  });

  async function sendForm(event) {
    event.preventDefault();
    let requestResult;

    dispatch({ type: 'REESEND_BOLETO_REQUEST_LOADING', loading: true });

    try {
      const res = await axios.post('/resend-boleto', {
        subscriptionEmail: formValue.subscriptionEmail,
        sendEmail: optionsValue.useSubscriptionEmailToSend
          ? formValue.subscriptionEmail
          : formValue.sendEmail,
      });

      requestResult = res.data;
    } catch (error) {
      if (error.name === 'Error' && error.message === 'Network Error') {
        requestResult = 'Network Error';
      } else if (error.response.data) {
        requestResult = error.response.data;
      } else {
        requestResult = 'Undefined Error';
      }
    } finally {
      dispatch(
        setRequestState.attValue('REESEND_BOLETO_REQUEST_STATE', requestResult),
      );
    }
  }

  return (
    <section className={css.main}>
      <Head />
      <div className={css.content__container}>
        <div className={css.content}>
          <form className={css.form} onSubmit={sendForm}>
            <TitleDefault text="Reenviar Boleto" margin="0px 0px 20px 0px" />
            <div className={css.form__item}>
              <InputBlock
                type="text"
                name="subscriptionEmail"
                id="subscriptionEmail"
                placeholder="E-Mail do assinante"
                spellCheck="false"
                autoComplete="off"
                setFormValue={setFormValue}
                formValue={formValue}
              />
            </div>
            <div className={css.form__item}>
              {!optionsValue.useSubscriptionEmailToSend && (
                <InputBlock
                  type="text"
                  name="sendEmail"
                  id="sendEmail"
                  placeholder="E-Mail que receberá o boleto"
                  spellCheck="false"
                  autoComplete="off"
                  setFormValue={setFormValue}
                  formValue={formValue}
                />
              )}
            </div>
            <div className={css.form__button}>
              {loading ? (
                <ButtonDefault text="Enviando..." disabled />
              ) : (
                <ButtonDefault text="Enviar" type="submit" />
              )}
            </div>
          </form>
          <OneOrAnother text="Opções" margin="30px 0px" />
          <ResendBoletoOptions />

          {loading || status ? (
            <>
              <OneOrAnother text="Status da requisição" margin="30px 0px" />
              <RequestState />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default connect((state) => ({
  loading: state.getRequestState.resendBoleto.loading,
  status: state.getRequestState.resendBoleto.status,
  optionsValue: { ...state.getResendBoletoOptions.optionsValue },
}))(Home);
