import React from 'react';
import css from './InputCheckbox.module.scss';

/** Input do tipo "Caixa de Texto"
 * @summary "Cria um input do tipo "Caixa de Texto" com estilo padrão da página."
 * @param {*String} formValue "Valor do hook 'useState' do formulário."
 * @param {*String} setFormValue "Valor do 'set' do hook 'useState' do formulário."
 * @param {*String} id "Este atributo é obrigatório porque ele será usado tanto para atualizar o hook 'useState' do formulário quanto para associar o label. (OBS: O ID tem que ter o mesmo nome de uma propriedade no hook 'useState' do formulário)."
 * @param {String} label "O texto digitado neste parâmetro sera dado ao  label do input um texto."
 * @param {Object} props "Outros atributos do input."
 */
const InputCheckbox = ({
  label,
  id,
  formValue,
  setFormValue,
  dispatch,
  ...props
}) => {
  /** Atualizar o hook 'useState' do componente pai.
   * @function attForm
   * @summary "Atualiza o hook useState dos formulários que estiverem usando este componente (OBS: Para isto funcionar o hook precisa ter uma propriedade com o mesmo nome do ID atribuido ao atribudo "id" dado a este componente )."
   * @param {*Object} target "Objeto com as informações do input."
   */
  function attForm({ target }) {
    const { id } = target;
    setFormValue({ ...formValue, [id]: target.checked });
  }

  return (
    <div className={css.main__input}>
      <label
        className={`${css.label} ${
          props.disabled ? css.checkbox__disabled : ''
        } ${formValue[id] ? css.checkbox__checked : ''}`}
        htmlFor={id}
      >
        <div id="checkboxGetClass" className={css.checkbox__box}>
          <div className={css.checkbox__box__icon}></div>
        </div>
        {label && <span>{label}</span>}
      </label>

      <input
        className={css.input}
        type="checkbox"
        id={id}
        onChange={attForm}
        checked={formValue[id]}
        {...props}
      />
    </div>
  );
};

export default InputCheckbox;
