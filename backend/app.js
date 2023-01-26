// Importation de mongoose; express...

const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors')

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const path = require('path');

// On créé l'application

const app = express();
app.use(express.json()); // Ce middleware intercepte toutes les requêtes qui contiennent du JSON afin que l'on puisse avoir accès au corps de la requête
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')))


// On importe et connecte la base de données

mongoose.connect("mongodb+srv://Theo3607:Openclassrooms36@cluster0.z0vhgvv.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


app.use('/api/auth', userRoutes)
app.use('/api/auth', userRoutes)

app.use('/api/sauces', saucesRoutes)
app.post('/api/sauces', saucesRoutes)

app.use('/api/sauces/:id', saucesRoutes)
app.put('/api/sauces/:id', saucesRoutes)
app.delete('/api/sauces/:id', saucesRoutes)

app.post('/api/sauces/:id/like', saucesRoutes)

// On exporte l'application pour pouvoir y accéder depuis le serveur

module.exports = app;