const { check } = require('express-validator');

// Checa os valores do formulário recebido antes de iniciar as requisições na API Pagarme
exports.onlyEmails = () => {
  return [
    check('subscriptionEmail')
      .isEmail()
      .withMessage('Email de assinante inválido.'),
    check('sendEmail').isEmail().withMessage('Email de destino inválido.'),
  ];
};
