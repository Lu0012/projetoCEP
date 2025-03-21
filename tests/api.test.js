const request = require('supertest');
const app = require('../server'); // Importa o app do servidor
const { it } = require('node:test');

describe('Testes da API de CEP', () => {
    // Teste para um CEP válido
    it('Deve retornar os dados do CEP 01001000', async () => {
        const response = await request(app)
            .get('/cep/01001000')
            .expect(200); // Espera um status 200 OK

        // Verifica se os dados retornados estão corretos
        expect(response.body).toEqual({
            cep: '01001-000',
            logradouro: 'Praça da Sé',
            complemento: 'lado ímpar',
            unidade: '',
            bairro: 'Sé',
            localidade: 'São Paulo',
            uf: 'SP',
            estado: 'São Paulo',
            regiao: 'Sudeste',
            ibge: '3550308',
            gia: '1004',
            ddd: '11',
            siafi: '7107'
        });
    });
    // aqui colocaremos os demais testes
});

//Teste para um CEP inválido
it('Deve retornar erro para um CEP inválido' , async() => {
const response = await request (app)
.get('/cep/00000000')
.expect(404); //Espera um status 404 Not Found

//Verifica a Mensagem de erro
expect (response.body).toEqual({error: 'CEP não encontrado'})
});

//Teste para um CEP mal formato 
it('Deve retornar erro para um CEP mal formatado' , async () => {
   const response = await request (app)
get('/cep/123')
});