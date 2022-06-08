import express from 'express'

const router = express.Router()
import {getGardens, createGarden, updateGarden, getGarden, deleteGarden} from '../controllers/gardenController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/')
    .get(protect, getGardens)
    .post(protect, createGarden);

router.route('/:id')
    .get(protect, getGarden)
    .delete(protect, deleteGarden)
    .put(protect, updateGarden);

export default router
