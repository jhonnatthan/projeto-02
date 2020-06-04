/**
 * Uma função que recebe `date`, um objeto de data que
 * será convertido para o formato de tempo
 * @example
 * const date = new Date();
 *
 * return (
 *  <p>{formatDateToBr(date)</p>
 * )
 * @param date - Objeto em formato data ou string
 */

const formatDateToHours = (date: Date | string): string => {
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

    const hora = dateObj.getHours();
    const minuto = dateObj.getMinutes();
    const segundos = dateObj.getSeconds();

    const horaF = hora < 10 ? `0${hora}` : hora;
    const minutoF = minuto < 10 ? `0${minuto}` : minuto;
    const segundosF = segundos < 10 ? `0${segundos}` : segundos;

    return `${horaF}:${minutoF}:${segundosF}`;
  } else {
    return '';
  }
};

export default formatDateToHours;
