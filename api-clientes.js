const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const serviceAccount = require('./firebase-admin-sdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const db = admin.firestore();

// Permitir solicitações de qualquer origem
app.use(cors());

app.get('/clientes', async (req, res) => {
  try {
    const clientesRef = db.collection('clientes');
    const snapshot = await clientesRef.get();
    const clientes = [];
    snapshot.forEach(doc => {
      clientes.push(doc.data());
    });
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao obter clientes:', error);
    res.status(500).send('Erro ao obter clientes.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
