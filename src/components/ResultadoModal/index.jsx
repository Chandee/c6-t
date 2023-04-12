import React from 'react';
import { Button, Box, Modal } from '@mui/material';
import { calcValorIRCDB, transformaNumeroDinheiro } from '../../utils/helper';
import './styles.css'
const ResultadoModal = ({ open, handleClose, calcCDB, prazo, valorInit }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const mostraFaixaIR = () => {
    if (prazo <= 180) {
      return '22,50 %';
    }
    if (prazo <= 360) {
      return '20 %';
    }
    if (prazo <= 720) {
      return '17,50 %';
    }
    return '15 %';
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <h2 className='titulo'>Resultado</h2>
        <p>
          Guardando {transformaNumeroDinheiro(valorInit)} todo mes vai te gerar:
        </p>
        <p>
          CDB pré fixado:{' '}
          {calcValorIRCDB({ prazo, valorInit, valorFinal: calcCDB })}
        </p>
        <p>Imposto de renda: {mostraFaixaIR()} </p>
        <div>
          <Button
            className='centralizar'
            variant='contained'
            color='primary'
            onClick={handleClose}
          >
            Nova simulação
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ResultadoModal;
