import { nanoid } from 'nanoid'
const notes = [
    
]

export const createNote = (req, res, next) => {
    const { title = 'untitled', tags, body } = req.body

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt
    const newNote = { title, tags, body, id, createdAt, updatedAt }
    
    notes.push(newNote)

    const isSuccess = notes.filter((note) => note.id === id).length > 0

    if(!isSuccess) {
        return res.status(500).json({
            status: "fail",
            message: "Gagal menyimpan"
        })
    }

    return res.status(201).json({
        status: "success",
        message: "Berhasil menyimpan",
        data: { noteId: id }
    })
}

export function getNotes(req, res) {
    return res.status(200).json({
        status: 'success',
        data: { notes }
    })
}

export function getNoteById(req, res) {
    const { id } = req.params

    const note = notes.find((n) => n.id === id)

    if(!note) {
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal menemukan catatan'
        })
    }

    return res.status(200).json({
        status: 'success',
        data: { note }
    })
}

export function deleteNoteById(req, res) {
    const { id } = req.params

    const index = notes.findIndex((n) => n.id === id)

    if (index !== -1) {
        notes.splice(index, 1)

        return res.status(204).json({
            status: 'success',
            message: `Berhasil menghapus catatan dengan id: ${id}`
        })
    }

    return res.status(404).json({
        status: 'failed',
        message: 'Gagal menghapus catatan dengan id: ' + id
    })
}

export const updateNoteById = (req, res) => {
    const { id } = req.params
    const { title, tags, body } = req.body
    const updatedAt = new Date().toISOString()

    const index = notes.findIndex((n) => n.id === id)

    if (index !== -1) {
        notes[index] = {...notes[index], title, tags, body, updatedAt }
        console.log('ok')
        return res.status(204).json({
            status: 'success',
            message: 'berhasil diedit'
        })
    }

    console.log('tidak')
    return res.status(404).json({
        status: 'fail',
        message: 'gagal mengedit'
    })
}