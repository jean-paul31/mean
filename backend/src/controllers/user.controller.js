const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
// Récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
};

// Ajouter un utilisateur
exports.createUser = async (req, res) => {
    try {
        const { email, mdp, name } = req.body;

        if (!email || !mdp || !name) {
            return res.status(400).json({ message: 'Champs requis manquants.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Un compte avec cet email existe déjà.' });
        }

        const hashedPassword = await bcrypt.hash(mdp, saltRounds);

        const newUser = new User({
            email,
            mdp: hashedPassword,
            name,
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            message: 'Utilisateur créé avec succès'
        });

    } catch (error) {
        console.error('Erreur createUser:', error);
        res.status(500).json({
            message: 'Erreur lors de la création de l\'utilisateur'
        });
    }
};

// Modifier un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, mdp } = req.body;

        // Vérification des champs
        if (!email || !mdp) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        }

        console.log('📤 Tentative de connexion avec email:', email);
        
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            console.log('❌ Utilisateur non trouvé');
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        //console.log('✅ Utilisateur trouvé:', user);

        // Vérifier si le mot de passe est valide
        const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
        if (!isPasswordValid) {
            console.log('❌ Mot de passe incorrect');
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        console.log('✅ Mot de passe valide');

        // Connexion réussie
        res.json({ message: 'Connexion réussie', user: { _id: user._id, email: user.email, name: user.name } });
        
    } catch (error) {
        console.error('❌ Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
};
