const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const checkResendBoletoRoute = require('../middleware/checkResendBoletoRoute');

const apiPagarme = require('../controllers/resendBoletoController');

/** Busca o ultimo boleto pendente de um assinante na API Pagarme e envia o boleto para um email de destino.
 * @summary "Sempre que um formulário for recebido o middleware 'checkResendBoletoRoute.onlyEmails()' verificará se os dados recebidos são emails válidos".
 * @access "Todos podem acessar esta rota".
 * @returns {(Sucess) *Object } "Informações do assinante e do boleto para confirmação de que os dados buscados foram encontrados".
 * @returns {(Fail) *Object} "Mensagem de erro".
 */
router.post(
  '/resend-boleto',
  checkResendBoletoRoute.onlyEmails(),
  async (req, res) => {
    // Verificar campos recebidos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: true,
        status: 400,
        message: errors.array()[0].msg,
        data: null,
      });
    }

    const subscriptionEmail = req.body.subscriptionEmail;
    const sendEmail = req.body.sendEmail;
    try {
      // Retorna o resultado das requisições realizadas a API Pagarme
      const result = await apiPagarme.resendBoleto({
        subscriptionEmail: subscriptionEmail,
        sendEmail: sendEmail,
      });

      if (result.error) res.status(result.status).send({ ...result });
      res.status(result.status).send({ ...result });
    } catch (err) {
      res.status(500).end({
        error: true,
        status: 500,
        message: `Falha ao enviar o email.`,
        data: null,
      });
    }
  },
);

module.exports = router;
