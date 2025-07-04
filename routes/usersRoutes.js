import express from 'express'

const router = express.Router()

// Routes
// Identification d'un utilisateur existant
router.get('/login', showRegisterForm)
router.post('/login', login)

// Enregistrement d'un nouvel utilisateur
router.get('/register', showLoginForm)
router.post('/register', register)

export default router