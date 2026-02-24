const express = require('express');
const cors = require('cors'); // Importa o CORS para permitir que o HTML fale com a API
const app = express();

app.use(cors()); // Ativa o CORS (isso resolve o bloqueio do navegador)
app.use(express.json());

// Rota de Teste
app.get('/', (req, res) => {
    res.send("API de Licenças Online e com CORS liberado!");
});

// Rota Principal
app.post('/api/generate_license', (req, res) => {
    const { token, name, email, product_id } = req.body;

    if (!token || !email) {
        return res.status(400).json({ status: false, message: "Dados incompletos" });
    }

    res.json({
        "status": true,
        "message": "Licença gerada com sucesso",
        "license_code": "A1B2-C3D4-E5F6-G7H8", // Aqui você pode depois criar uma lógica de código aleatório
        "email": email,
        "name": name,
        "product_id": product_id,
        "expires_at": "2027-12-31",
        "activation_limit": 1,
        "is_new": true
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));