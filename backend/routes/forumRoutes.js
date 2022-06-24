import express from 'express'

const router = express.Router()
import {
    getForums, getForumById, createForum, addReply, addLike, getAllForums
} from '../controllers/forumController.js'

import {protect} from '../middleware/authMiddleware.js'

router.route('/')
    .get(getForums)
    .post(protect, createForum);

router.route('/all')
    .get(getAllForums)

router.route('/:id')
    .post(getForumById);

router.route('/:id/reply')
    .post(protect, addReply);

router.route('/:id/reply/:rid/like')
    .post(protect, addLike);

export default router;
