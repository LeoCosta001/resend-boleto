import React from 'react';

/** @component WarningTriangle
 * @param {String} size "Tamanhos válidos em CSS (Ex: 10px, 10%, 10em, ...)".
 * @param {String} color "Cores válidas em CSS (formatos em HBS, Hexadecimal, ...)".
 * @param {String} color "Margem do icone".
 * @param {Boolean} effect "Se o valor for 'false' então nenhum efeito será aplicado".
 * @param {String} rotate "Define o lado para qual a animação irá girar ('left' ou 'right')".
 */
const WarningTriangle = ({
  size = '25px',
  color = '#000000',
  margin = '0px',
}) => {
  return (
    <>
      <svg
        viewBox="0 0 20 20"
        style={{ width: size, height: size, margin: margin }}
      >
        <path
          fill={color}
          d="M18.344,16.174l-7.98-12.856c-0.172-0.288-0.586-0.288-0.758,0L1.627,16.217c0.339-0.543-0.603,0.668,0.384,0.682h15.991C18.893,16.891,18.167,15.961,18.344,16.174 M2.789,16.008l7.196-11.6l7.224,11.6H2.789z M10.455,7.552v3.561c0,0.244-0.199,0.445-0.443,0.445s-0.443-0.201-0.443-0.445V7.552c0-0.245,0.199-0.445,0.443-0.445S10.455,7.307,10.455,7.552M10.012,12.439c-0.733,0-1.33,0.6-1.33,1.336s0.597,1.336,1.33,1.336c0.734,0,1.33-0.6,1.33-1.336S10.746,12.439,10.012,12.439M10.012,14.221c-0.244,0-0.443-0.199-0.443-0.445c0-0.244,0.199-0.445,0.443-0.445s0.443,0.201,0.443,0.445C10.455,14.021,10.256,14.221,10.012,14.221"
        ></path>
      </svg>
    </>
  );
};

export default WarningTriangle;
