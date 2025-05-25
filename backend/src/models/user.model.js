// Modèle utilisateur

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    mdp: String
});
module.exports = mongoose.model('User', UserSchema);
