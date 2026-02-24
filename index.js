const express = require('express');
const app = express();

// OBRIGATÓRIO: Faz o servidor entender quando você envia um JSON pelo Insomnia
app.use(express.json());

// Rota de Teste (Navegador): Acesse para ver se a API está online
app.get('/', (req, res) => {
    res.send("API de Licenças Online!");
});

// Rota Principal (POST): Onde as licenças são geradas
app.post('/api/generate_license', (req, res) => {
    const { token, name, email, product_id } = req.body;

    // Verificação básica: se não enviar token ou e-mail, dá erro
    if (!token || !email) {
        return res.status(400).json({ 
            status: false, 
            message: "Dados obrigatórios ausentes (token ou email)." 
        });
    }

    // Resposta que você deseja receber no Insomnia
    res.json({
        "status": true,
        "message": "Licença gerada com sucesso",
        "license_code": "A1B2-C3D4-E5F6-G7H8",
        "email": email,
        "name": name,
        "product_id": product_id,
        "expires_at": "2027-12-31",
        "activation_limit": 1,
        "is_new": true
    });
});

// O Render define a porta automaticamente, por isso usamos process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando localmente em http://localhost:${PORT}`);
});