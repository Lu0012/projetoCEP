const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Servindo o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para buscar informações do CEP
app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    // Validação do formato do CEP
    if (!/^\d{8}$/.test(cep)) {
        return res.status(400).json({ error: 'Formato de CEP inválido. O CEP deve conter exatamente 8 dígitos.' });
    }

    try {
        // Fazendo a requisição para a API do ViaCEP
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;

        // Verificando se o CEP foi encontrado
        if (data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }

        // Retornando os dados do CEP
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);

        // Tratando erros específicos da API ViaCEP
        if (error.response && error.response.status === 400) {
            return res.status(400).json({ error: 'Formato de CEP inválido' });
        }

        // Erro genérico
        res.status(500).json({ error: 'Erro ao buscar CEP' });
    }
});

// Iniciando o servidor
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

module.exports = app;