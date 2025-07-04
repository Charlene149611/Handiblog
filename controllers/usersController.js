import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from '../models/usersModel.js';

export function showRegisterForm(req, res) {
    res.render('register', { error: null, success: null });
}

export async function register(req, res) {
    const { username, email, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.render('register', { error: 'Tous les champs sont requis.', success: null });
    }

    if (password !== confirmPassword) {
        return res.render('register', { error: 'Les mots de passe ne correspondent pas.', success: null });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return res.render('register', { error: 'Un utilisateur avec cet email existe déjà.', success: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, email, hashedPassword, role || 'lecteur');

    res.render('login' , { error: null, success: 'Inscription réussie. Vous pouvez maintenant vous connecter.' });
}

export function showLoginForm(req, res) {
    res.render('login', { error: null, success: null });
}

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { error: 'Tous les champs sont requis.', success: null });
    }   

    const user = await findUserByEmail(email);
    if (!user) {
        return res.render('login', { error: 'Email ou mot de passe incorrect.', success: null });
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        return res.render('login', { error: 'Email ou mot de passe incorrect.', success: null });
    }   

    // req.session.user = {
    //     id: user.id,
    //     email: user.email,
    //     role: user.role
    // };
    res.redirect('/'); // Redirige vers la page d'accueil ou une autre page après la connexion réussie
}

export function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error('Erreur lors de la déconnexion:', err);
            return res.redirect('/');
        }
        res.redirect('/auth/login');
    }); 
}