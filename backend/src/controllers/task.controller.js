const Task = require('../models/task.model');
const User = require('../models/user.model');

// Récupérer toutes les tâches
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email');
        if (tasks.length === 0) {
            return res.status(200).json({ message: "Aucune tâche trouvée", tasks: [] });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des tâches", error });
    }
};

// Ajouter une nouvelle tâche
exports.createTask = async (req, res) => {
    try {
        const { title, assignedTo } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Le titre est requis" });
        }

        let userExists = null;
        if (assignedTo) {
            userExists = await User.findById(assignedTo);
            if (!userExists) {
                return res.status(400).json({ message: "Utilisateur assigné non trouvé" });
            }
        }

        const newTask = new Task({ title, assignedTo: userExists ? assignedTo : null });
        await newTask.save();

        const populatedTask = await Task.findById(newTask._id).populate('assignedTo', 'name email');
        res.json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la tâche", error });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const { assignedTo } = req.body;
        let updateData = { ...req.body };

        if (assignedTo) {
            const userExists = await User.findById(assignedTo);
            if (!userExists) {
                return res.status(400).json({ message: "Utilisateur non trouvé" });
            }
            updateData.assignedTo = assignedTo;
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('assignedTo', 'name email');
        if (!updatedTask) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche", error });
    }
};

// Supprimer une tâche avec vérification
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }
        res.json({ message: "Tâche supprimée" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la tâche", error });
    }
};

// Récupérer les tâches assignées à un utilisateur
exports.getTasksByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Vérifier si l'utilisateur existe
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Trouver toutes les tâches assignées à cet utilisateur
        const tasks = await Task.find({ assignedTo: userId }).populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des tâches", error });
    }
};

