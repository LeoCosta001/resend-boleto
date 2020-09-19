exports.attValue = (typeName, requestData) => {
  if (requestData === 'Network Error') {
    return {
      type: typeName,
      data: {
        error: true,
        status: 404,
        message:
          'ERRO! Verifique a sua conexão com a internet e tente novamente.',
        data: null,
        loading: false,
      },
    };
  } else if (requestData === 'Undefined Error') {
    return {
      type: typeName,
      data: {
        error: true,
        status: 404,
        message: 'ERRO! Houve um erro incomum, tente novamente.',
        data: null,
        loading: false,
      },
    };
  } else {
    return {
      type: typeName,
      data: {
        error: requestData.error,
        status: requestData.status,
        message: requestData.message,
        data: requestData.data,
        loading: false,
      },
    };
  }
};
