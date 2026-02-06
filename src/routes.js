import express from 'express'
import {
    createNote,
    getNotes,
    getNoteById,
    deleteNoteById,
    updateNoteById
} from './controller.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('OK').status(200)
})

router.get('/notes', getNotes)

router.post('/notes', createNote)

router.get('/notes/:id', getNoteById)

router.delete('/notes/:id', deleteNoteById)

router.put('/notes/:id', updateNoteById)

export default router