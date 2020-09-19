/***********
 * Módulos *
 ***********/
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/***************
 * Componentes *
 ***************/
import Home from '../views/Home/Home';

const ClientRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ClientRoutes;
