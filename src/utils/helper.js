export const formataApenasNumeros = (val) => {
  return val.replace(/[^0-9]/g, '');
};

export const transformaNumeroDinheiro = (val) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(val);
};

export const  calcValorIRCDB = ({ valorInit, valorFinal, prazo }) => {
  const rendimento = valorFinal - valorInit;
  let valorRetido = 0;
  let valorFinalRendimento = 0;

  if (prazo <= 180) {
    valorRetido = rendimento * 0.2255;
    valorFinalRendimento = valorFinal - valorRetido;
    return transformaNumeroDinheiro(parseFloat(valorFinalRendimento.toFixed(2)));
  }
  if (prazo <= 360) {
    valorRetido = rendimento * 0.2;
    valorFinalRendimento = valorFinal - valorRetido;

    return transformaNumeroDinheiro(parseFloat(valorFinalRendimento.toFixed(2)));
  }

  if (prazo <= 720) {
    valorRetido = rendimento * 0.175;
    valorFinalRendimento = valorFinal - valorRetido;

    return transformaNumeroDinheiro(parseFloat(valorFinalRendimento.toFixed(2)));
  }

  valorRetido = rendimento * 0.15;
  valorFinalRendimento = valorFinal - valorRetido;

  return transformaNumeroDinheiro(parseFloat(valorFinalRendimento.toFixed(2)));
};
