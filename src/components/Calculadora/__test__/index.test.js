import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Calculadora from '../../Calculadora';
import { calculoCDB } from '../../../utils/Request';

jest.mock('../../../utils/Request', () => ({
  calculoCDB: jest.fn(),
}));

describe('Calculadora teste', () => {
  beforeEach(() => {
    calculoCDB.mockClear();
  });

  it('Deve renderizar o componente', () => {
    render(<Calculadora />);
    const header = screen.getByText('Calculadora de investimentos');
    const valueInput = screen.getByLabelText('Valor');
    const deadlineInput = screen.getByLabelText('Prazo');
    const submitButton = screen.getByRole('button', { name: 'Simular' });
    expect(header).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(deadlineInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Verifica troca de valor no input Valor', () => {
    render(<Calculadora />);
    const valueInput = screen.getByLabelText('Valor');
    fireEvent.change(valueInput, { target: { value: 'R$ 100,00' } });
    expect(valueInput.value.replace(/\u00a0/g, ' ')).toBe('R$ 100,00');
  });

  it('Verifica troca de valor no input Prazo', () => {
    render(<Calculadora />);
    const deadlineInput = screen.getByLabelText('Prazo');
    fireEvent.change(deadlineInput, { target: { value: '10' } });
    expect(deadlineInput.value).toBe('10');
  });

  it('Verifica se chamou a função de chamar api', async () => {
    const mockResponse = {
      result: JSON.stringify([10.0]),
    };
    calculoCDB.mockResolvedValue(mockResponse);
    render(<Calculadora />);
    const valueInput = screen.getByLabelText('Valor');
    fireEvent.change(valueInput, { target: { value: 'R$ 100,00' } });
    const deadlineInput = screen.getByLabelText('Prazo');
    fireEvent.change(deadlineInput, { target: { value: '10' } });
    const submitButton = screen.getByRole('button', { name: 'Simular' });
    fireEvent.click(submitButton);
    await waitFor(() => expect(calculoCDB).toHaveBeenCalledTimes(1));
  });
});
