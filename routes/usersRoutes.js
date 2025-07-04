import express from 'express'
import {showLoginForm, login, showRegisterForm, register} from '../controllers/usersController.js'

const router = express.Router()

// Routes
// Identification d'un utilisateur existant
router.get('/login', showLoginForm)
router.post('/login', login)

// Enregistrement d'un nouvel utilisateur
router.get('/register', showRegisterForm)
router.post('/register', register)

export default router