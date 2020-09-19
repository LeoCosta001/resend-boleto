const pagarme = require('pagarme');

/** Reenvia o ultimo boleto de status "pendente" de um assinante do Pagarme.
 * @summary "Esta função segue estas estapas de execução:
 *    1 - Checa a conexão com a API Pagarme através da "api_key".
 *    2 - Procura nas listas de assinantes algum que tenha o Email informado.
 *    3 - Busca a lista de todas as transações do assinante que foi encontrado.
 *    4 - Separa as transações de Boleto que tenha o status "waiting_payment" (Esperando pagamento).
 *    5 - Ordena a lista dos boletos pendentes por data em ordem decrecente.
 *    6 - Envia o boleto encontrado para o email escolhido".
 * @function resendBoleto
 * @param {*Object} options "Objeto com as informações para a busca e o envio do boleto:
 *    - "subscriptionEmail": Email do assinante que vai ser usada para a busca das transações.
 *    - "sendEmail": Email para onde será enviado o boleto".
 * @returns {(Sucess) Object} "Informações do usuário autenticado sem a key 'password'.
 * @returns {(Fail) Object} "Mensagem de erro".
 */
exports.resendBoleto = async (options) => {
  let client;

  try {
    // Acessar API Pagarme
    client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });
  } catch (err) {
    return {
      error: true,
      status: 422,
      message: `ERRO! A chave de conexão com a API Pagarme é inválida.`,
      data: null,
    };
  }

  try {
    let allSubscriptions;
    let findSubscription;

    // OBS: A API tem um limite de 1000 resultados por página, esse loop faz com que a busca seja realizada em diversas páginas
    for (pageNumber = 1; pageNumber < 11; pageNumber++) {
      allSubscriptions = await client.subscriptions.all({
        count: 1000,
        page: pageNumber,
      });

      findSubscription = allSubscriptions.filter((value) => {
        return value.customer.email === options.subscriptionEmail;
      });

      if (findSubscription.length) break;
    }

    if (!findSubscription.length)
      return {
        error: true,
        status: 404,
        message: `Não foi encontrado nenhum assinante com este email '${options.subscriptionEmail}'.`,
        data: null,
      };

    // Retornar todas as transações do assinante
    const allTransactions = await client.subscriptions.findTransactions({
      id: findSubscription[0].id,
    });

    if (!allTransactions.length)
      return {
        error: false,
        status: 200,
        message: `Nenhuma transação encontrada para o assinante '${findSubscription[0].customer.name}'.`,
        data: null,
      };

    // Separar os boletos pendentes
    const pendingBoleto = allTransactions.filter((value) => {
      return (
        value.payment_method === 'boleto' && value.status === 'waiting_payment'
      );
    });

    if (!pendingBoleto.length)
      return {
        error: false,
        status: 200,
        message: `Nenhum boleto pendente para o assinante '${allTransactions[0].customer.name}'.`,
        data: null,
      };

    // Organizar boletos pendentes em ordem decrescente por data de vencimento
    const sortBoleto = pendingBoleto.sort((firstValue, nextValue) => {
      return (
        new Date(firstValue.plantingDate) - new Date(nextValue.plantingDate)
      );
    });

    // Enviar boleto por email
    await client.transactions.collectPayment({
      id: sortBoleto[0].id,
      email: options.sendEmail,
    });

    return {
      error: false,
      status: 200,
      message: `Boleto enviado com sucesso!`,
      data: {
        sendInfo: {
          sendEmail: options.sendEmail,
          sendDate: new Date(Date.now()),
        },
        subscriptionInfo: {
          name: sortBoleto[0].customer.name,
          subscriptionEmail: options.subscriptionEmail,
        },
        transactionInfo: {
          boletoId: sortBoleto[0].id,
          boletoExpirationDate: sortBoleto[0].boleto_expiration_date,
        },
      },
    };
  } catch (err) {
    return {
      error: true,
      status: 404,
      message: err,
      data: null,
    };
  }
};
