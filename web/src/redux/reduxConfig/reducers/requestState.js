const INITIAL_STATE = {
  resendBoleto: {
    error: null,
    status: null,
    message: null,
    data: null,
    loading: false,
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
    case 'REESEND_BOLETO_REQUEST_STATE':
      return {
        ...state,
        resendBoleto: {
          ...action.data,
        },
      };
    case 'REESEND_BOLETO_REQUEST_LOADING':
      return {
        ...state,
        resendBoleto: {
          ...state.data,
          loading: action.loading,
        },
      };
    default:
      return state;
  }
}

export default reducerRequestState;
