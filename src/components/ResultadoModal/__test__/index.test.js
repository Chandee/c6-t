import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import ResultadoModal from '../../ResultadoModal';

describe('ResultadoModal teste', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se renderizou com os dados corretos', () => {
    const mockProps = {
      open: true,
      handleClose: jest.fn(),
      calcCDB: 1139.12,
      prazo: 180,
      valorInit: 1000,
    };
    render(<ResultadoModal {...mockProps} />);
    const tituloTexto = screen.getByText('Resultado');
    const CDBTexto = screen.queryByText(/CDB pré fixado:/i);
    const valorCDB = screen.queryByText(/1.107,75/i);
    const impostoRendaTexto = screen.queryByText(/Imposto de renda:/i);
    const valorImposto = screen.queryByText(/22,50/i);

    expect(tituloTexto).toBeInTheDocument();
    expect(CDBTexto).toBeInTheDocument();
    expect(valorCDB).toBeInTheDocument();
    expect(impostoRendaTexto).toBeInTheDocument();
    expect(valorImposto).toBeInTheDocument();
  });

  it('imposto de renda com menos de 360 dias', () => {
    const mockProps = {
      open: true,
      handleClose: jest.fn(),
      calcCDB: 1139.12,
      prazo: 300,
      valorInit: 1000,
    };
    render(<ResultadoModal {...mockProps} />);

    const valorImposto = screen.queryByText(/20/i);
    expect(valorImposto).toBeInTheDocument();
  });

  it('Imposto de renda com menos de 720 dias', () => {
    const mockProps = {
      open: true,
      handleClose: jest.fn(),
      calcCDB: 1139.12,
      prazo: 500,
      valorInit: 1000,
    };
    render(<ResultadoModal {...mockProps} />);

    const valorImposto = screen.queryByText(/17,50/i);
    expect(valorImposto).toBeInTheDocument();
  });

  it('Imposto de renda com mais de 720 dias', () => {
    const mockProps = {
      open: true,
      handleClose: jest.fn(),
      calcCDB: 1139.12,
      prazo: 800,
      valorInit: 1000,
    };
    render(<ResultadoModal {...mockProps} />);
    const valorImposto = screen.queryByText(/15/i);
    expect(valorImposto).toBeInTheDocument();
  });

  it('Verifica se chamou a função de fechar a modal', () => {
    const mockProps = {
      open: true,
      handleClose: jest.fn(),
      calcCDB: 1139.12,
      prazo: 180,
      valorInit: 1000,
    };
    render(<ResultadoModal {...mockProps} />);

    const modalElement = screen.getByText(/Nova simulação/i);
    fireEvent.click(modalElement);

    expect(mockProps.handleClose).toHaveBeenCalledTimes(1);
  });
});
