const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const taskController = require('./controllers/task.controller.js');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use('/users', require('./routes/user.route'));
app.use('/tasks', require('./routes/task.route'));
app.get('/tasks/user/:userId', taskController.getTasksByUser);

// Gestion des erreurs
app.use(errorHandler);

app.listen(3000, () => console.log('🚀 Serveur démarré sur le port 3000'));
