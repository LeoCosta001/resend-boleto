import React from 'react';
import { connect } from 'react-redux';

/***************
 * Componentes *
 ***************/
import LoadingArrow from '../SvgIcons/LoadingArrow';
import WarningTriangle from '../SvgIcons/WarningTriangle';
import ErrorCircle from '../SvgIcons/ErrorCircle';
import SuccessCircle from '../SvgIcons/SuccessCircle';

/*******
 * CSS *
 *******/
import css from './RequestState.module.scss';

const NewItem = ({ title, text }) => {
  return (
    <>
      <span className={css.item}>{title}</span>
      <span className={css.item__text}>{text}</span>
    </>
  );
};

const RequestState = ({ error, status, message, data, loading }) => {
  function transformDate(date, addHours) {
    date = new Date(date);
    let [day, month, year, hour, minute] = [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
      date.getHours(),
      date.getMinutes(),
    ];

    if (!addHours) return `${day}/${month}/${year}`;

    return `${day}/${month}/${year} - ${hour}:${
      minute < 10 ? `0${minute}` : minute
    }`;
  }

  // Enviando
  if (loading)
    return (
      <div className={css.main}>
        <LoadingArrow color="#2ecc71" size="40px" effect={true} />
        <span className={`${css.loading__message} ${css.state__message}`}>
          Enviando...
        </span>
      </div>
    );

  // Erro ao enviar
  if (!loading && error)
    return (
      <div className={css.main}>
        <ErrorCircle color="#f44237" size="40px" />
        <span className={`${css.error__message} ${css.state__message}`}>
          {message}
        </span>
      </div>
    );

  // Condições de envio não atendidas (Ex: Não ter boleto pendente ou Não ter transições encontradas)
  if (!loading && !error && !data && status)
    return (
      <div className={css.main}>
        <WarningTriangle color="#f39c12" size="40px" />
        <span className={`${css.warning__message} ${css.state__message}`}>
          {message}
        </span>
      </div>
    );

  // Enviado com sucesso
  if (!loading && !error && data && status)
    return (
      <div className={css.main}>
        <SuccessCircle color="#2ecc71" size="40px" />
        <span className={`${css.success__message} ${css.state__message}`}>
          {message}
        </span>
        <article className={css.success__content__container}>
          {/* Dados do assinante */}
          <div className={css.success__content__item}>
            <p className={css.item__title}>Dados do assinante:</p>
            <NewItem title="Nome:" text={data.subscriptionInfo.name} />
            <NewItem
              title="Email:"
              text={data.subscriptionInfo.subscriptionEmail}
            />
          </div>

          {/* Dados do boleto */}
          <div className={css.success__content__item}>
            <p className={css.item__title}>Dados do boleto:</p>
            <NewItem title="ID:" text={data.transactionInfo.boletoId} />
            <NewItem
              title="Data de vencimento:"
              text={transformDate(data.transactionInfo.boletoExpirationDate)}
            />
          </div>

          {/* Dados do envio */}
          <div className={css.success__content__item}>
            <p className={css.item__title}>Dados de envio:</p>
            <NewItem title="Email:" text={data.sendInfo.sendEmail} />
            <NewItem
              title="Data:"
              text={transformDate(data.sendInfo.sendDate, true)}
            />
          </div>
        </article>
      </div>
    );

  return null;
};
export default connect((state) => ({
  error: state.getRequestState.resendBoleto.error,
  status: state.getRequestState.resendBoleto.status,
  message: state.getRequestState.resendBoleto.message,
  data: state.getRequestState.resendBoleto.data,
  loading: state.getRequestState.resendBoleto.loading,
}))(RequestState);
