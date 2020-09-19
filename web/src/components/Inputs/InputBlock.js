import React from 'react';
import css from './InputBlock.module.scss';

/** Input do tipo "Caixa de Texto"
 * @summary "Cria um input do tipo "Caixa de Texto" com estilo padrão da página."
 * @param {*String} formValue "Valor do hook 'useState' do formulário."
 * @param {*String} setFormValue "Valor do 'set' do hook 'useState' do formulário."
 * @param {*String} id "Este atributo é obrigatório porque ele será usado tanto para atualizar o hook 'useState' do formulário quanto para associar o label. (OBS: O ID tem que ter o mesmo nome de uma propriedade no hook 'useState' do formulário)."
 * @param {String} label "O texto digitado neste parâmetro sera dado ao um label do input, mas caso o valor sejá omitido então o label não será renderizado."
 * @param {Object} props "Outros atributos do input."
 * @param {String} etc... "Outros parâmetros também são atributos do input."
 */
const InputBlock = ({
  label,
  type,
  name,
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
    const { id, value } = target;
    setFormValue({ ...formValue, [id]: value });
  }

  return (
    <div className={css.main__input}>
      {label && (
        <label className={css.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={css.input}
        type={type}
        name={name}
        id={id}
        onChange={attForm}
        value={formValue[id]}
        {...props}
      />
    </div>
  );
};

export default InputBlock;
