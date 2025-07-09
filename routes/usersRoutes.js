import express from 'express'
import {showLoginForm, login, showRegisterForm, register, modifyUser, deleteUser, checkRights} from '../controllers/usersController.js'

const router = express.Router()

// Routes
// Identification d'un utilisateur existant
router.get('/login', showLoginForm)
router.post('/login', login)

// Enregistrement d'un nouvel utilisateur
router.get('/register', showRegisterForm)
router.post('/register', register)

// Modification d'un utilisateur
router.put('/modify/:id', checkRights, modifyUser)

// Suppression d'un utilisateur
router.delete('/delete/:id', checkRights, deleteUser)

export default router