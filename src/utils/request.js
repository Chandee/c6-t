import axios from 'axios'
import { CDI, TB } from './constantes';


export const calculoCDB = async (valor) => {
  try{
    const calculo = `${valor} * [1 + (${CDI} * ${TB})]`
    const response = await axios.post('http://api.mathjs.org/v4/', {
      expr: calculo,
    })

    return response.data;

  }catch(error){
    console.error(error)
  }
}