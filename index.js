const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve o HTML da pasta 'public' automaticamente

// Função para gerar um código aleatório (Ex: XXXX-XXXX-XXXX)
function gerarCodigo() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const pedaço = () => Array.from({length: 4}, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');
    return `${pedaço()}-${pedaço()}-${pedaço()}`;
}

app.post('/api/generate_license', (req, res) => {
    const { token, name, email, product_id } = req.body;

    if (!token || !email) {
        return res.status(400).json({ status: false, message: "Dados incompletos" });
    }

    res.json({
        "status": true,
        "message": "Licença gerada com sucesso",
        "license_code": gerarCodigo(), // AGORA É ALEATÓRIO!
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