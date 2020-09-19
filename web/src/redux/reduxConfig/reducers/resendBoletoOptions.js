const INITIAL_STATE = {
  optionsValue: {
    useSubscriptionEmailToSend: false,
  },
};

/** @function reducerRequestState(*)
 * @param {*} state "Valor do "state" antes dele ser atualizado"
 * @param {*} action "Valor passado no parâmetro do "dispatch""
 * @returns {*} "Será retornada o valor do novo "state"
 */
// OBS: Promessas e alterações de dados devem ser tratados dentro das "actions" e não no reducer.
function reducerRequestState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FORM_RESEND_BOLETO_OPTIONS':
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
}

export default reducerRequestState;
