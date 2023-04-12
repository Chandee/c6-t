import { calcValorIRCDB, formataApenasNumeros, transformaNumeroDinheiro } from '../helper';

describe('calcValorIRCDB', () => {
  it('Taxa de 22,55% para menos de 180 dias', () => {
    const result = calcValorIRCDB({
      valorInit: 1000,
      valorFinal: 1139.12,
      prazo: 120,
    });
    expect(result.replace(/\u00a0/g, ' ')).toBe('R$ 1.107,75');
  });

  it('Taxa de 20% para menos de 360 dias', () => {
    const result = calcValorIRCDB({
      valorInit: 1000,
      valorFinal: 1139.12,
      prazo: 240,
    });
    expect(result.replace(/\u00a0/g, ' ')).toBe('R$ 1.111,30');
  });

  it('Taxa de 17,5% Para menos de 720 dias', () => {
    const result = calcValorIRCDB({
      valorInit: 1000,
      valorFinal: 1139.12,
      prazo: 480,
    });
    expect(result.replace(/\u00a0/g, ' ')).toBe('R$ 1.114,77');
  });

  it('Taxa de 15% para acima de 720 dias', () => {
    const result = calcValorIRCDB({
      valorInit: 1000,
      valorFinal: 1139.12,
      prazo: 800,
    });
    expect(result.replace(/\u00a0/g, ' ')).toBe('R$ 1.118,25');
  });
});

describe('transformaNumeroDinheiro', () => {
  it('Testa a transformação', () => {
    expect(transformaNumeroDinheiro(1234.56).replace(/\u00a0/g, ' ')).toBe(
      'R$ 1.234,56'
    );
    expect(transformaNumeroDinheiro(100).replace(/\u00a0/g, ' ')).toBe(
      'R$ 100,00'
    );
    expect(transformaNumeroDinheiro(0).replace(/\u00a0/g, ' ')).toBe('R$ 0,00');
    expect(transformaNumeroDinheiro(9999999.99).replace(/\u00a0/g, ' ')).toBe(
      'R$ 9.999.999,99'
    );
  });
});

describe('formataApenasNumeros', () => {
  test('should remove non-numeric characters from input string', () => {
    expect(formataApenasNumeros('abc123')).toBe('123');
    expect(formataApenasNumeros('(555) 555-1234')).toBe('5555551234');
    expect(formataApenasNumeros('')).toBe('');
    expect(formataApenasNumeros('12a3b4c')).toBe('1234');
  });
});
