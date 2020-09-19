import React from 'react';
import css from './TitleDefault.module.scss';

const TitleDefault = ({ text, margin }) => {
  return (
    <h1 className={css.main__text} style={{ margin }}>
      {text}
    </h1>
  );
};

export default TitleDefault;
