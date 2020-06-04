/**
 * Uma função que recebe `date`, um objeto de data que
 * será convertido para o formato brasileiro
 * @example
 * const date = new Date();
 *
 * return (
 *  <p>{formatDateToBr(date)</p>
 * )
 * @param date - Objeto em formato data ou string
 */

const formatDateToBr = (date: Date | string): string => {
  if (date !== '') {
    let dateObj;

    if (typeof date === 'string') {
      let formattedDate = date;

      if (formattedDate.includes(' ')) {
        formattedDate = formattedDate.replace(' ', 'T');
      }

      formattedDate = !formattedDate.includes('T')
        ? `${formattedDate}T00:00`
        : formattedDate;
      dateObj = new Date(formattedDate);
    } else {
      dateObj = date;
    }

    const dia = dateObj.getDate().toString();
    const mes = (dateObj.getMonth() + 1).toString();

    const diaF = dia.length === 1 ? `0${dia}` : dia;
    const mesF = mes.length === 1 ? `0${mes}` : mes;
    const anoF = dateObj.getFullYear();

    return `${diaF}/${mesF}/${anoF}`;
  } else {
    return '';
  }
};

export default formatDateToBr;
