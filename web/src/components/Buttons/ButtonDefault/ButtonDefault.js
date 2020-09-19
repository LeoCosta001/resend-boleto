import React from 'react';
import css from './ButtonDefault.module.scss';

const ButtonDefault = ({ text, ...props }) => {
  return (
    <button className={css.main__button} {...props}>
      {text}
    </button>
  );
};

export default ButtonDefault;
