import axios from 'axios';
import { Address } from '../types/Address';

//https://viacep.com.br/ws/${cep}/json/

const baseUrl = "https://viacep.com.br/ws"

export const getAddressInfo = async (zipCode: string): Promise<Address | null> => {
    try {
        // 013 !== 13 melhor usar string
        const response = await axios.get(`${baseUrl}/${zipCode}/json/`)
        //response.data
        const address: Address = {
            state: response.data.uf,
            city: response.data.localidade,
            district: response.data.bairro,
            street: response.data.logradouro
        }
        return address;
    } catch (error) {
        console.error("Erro no serviço getAddresInfo: ",error)
        return null
    }
}