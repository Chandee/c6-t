import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import {
  formataApenasNumeros,
  transformaNumeroDinheiro,
} from '../../utils/helper';
import { calculoCDB } from '../../utils/Request';
import ResultadoModal from '../ResultadoModal';
import './styles.css';

const Calculadora = () => {
  const [valor, setValor] = useState('');
  const [valorFormatadoDinheiro, setValorFormatadoDinheiro] = useState('');
  const [prazo, setPrazo] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [calcCDB, setCalcCDB] = useState(0);

  const handleValor = (event) => {
    const numeroFormatado = formataApenasNumeros(event.target.value);
    setValor(numeroFormatado / 100);
    const numeroFormatoDinheiro = transformaNumeroDinheiro(
      numeroFormatado / 100
    );
    setValorFormatadoDinheiro(numeroFormatoDinheiro);
  };

  const handlePrazo = (event) => {
    setPrazo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculoCDB(valor, prazo).then((resp) => {
      setCalcCDB(parseFloat(JSON.parse(resp.result)[0].toFixed(2)));
      setOpenModal(true);
    });
  };
  return (
    <div>
      <h2>Calculadora de investimentos</h2>
      <h3>Simulador</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            id='valor-aplicado-input'
            label='Valor'
            placeholder='Valor a ser aplicado'
            value={valorFormatadoDinheiro}
            onChange={handleValor}
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <TextField
            id='prazo-retirada-input'
            label='Prazo'
            placeholder='Prazo de retirada'
            value={prazo}
            onChange={handlePrazo}
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <Button
            className='buttonSubmit'
            variant='contained'
            color='primary'
            type='submit'
          >
            Simular
          </Button>
        </form>
      </div>
      <div>
        <ResultadoModal
          open={openModal}
          valorInit={valor}
          calcCDB={calcCDB}
          prazo={prazo}
          handleClose={() => {
            setOpenModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default Calculadora;
