import React from 'react';
import { Helmet } from 'react-helmet';

const Home_head = () => {
  return (
    <>
      <Helmet>
        <title>Reenviar Boleto</title>
        <meta
          name="description"
          content="Reenvie boletos pendentes dos assinantes."
        />
      </Helmet>
    </>
  );
};

export default Home_head;
