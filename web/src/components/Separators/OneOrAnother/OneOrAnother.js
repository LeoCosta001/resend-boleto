import React from 'react';
import css from './OneOrAnother.module.scss';

const OneOrAnother = ({
  text = 'OU',
  textSize = '1em',
  textColor = '#9c9c9c',
  margin = '40px 0px',
  borderSize = '2px',
  borderColor = 'black',
  borderOpacity = '0.1',
}) => {
  return (
    <div className={css.main} style={{ margin: margin }}>
      <hr
        style={{
          opacity: borderOpacity,
          borderTop: `solid ${borderSize} ${borderColor}`,
        }}
      />

      <span
        className={css.text}
        style={{
          fontSize: textSize,
          color: textColor,
        }}
      >
        {text}
      </span>

      <hr
        style={{
          opacity: borderOpacity,
          borderTop: `solid ${borderSize} ${borderColor}`,
        }}
      />
    </div>
  );
};

export default OneOrAnother;
