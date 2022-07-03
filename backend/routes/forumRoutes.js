import express from 'express'

const router = express.Router()
import {
    getForums, getForumById, createForum, addReply, addLike, getAllForums,approveforum,deleteForum
} from '../controllers/forumController.js'

import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/')
    .get(getForums)
    .post(protect, createForum);

router.route('/all')
    .get(getAllForums)

router.route('/:id')
    .post(getForumById)
    .delete(protect,admin,deleteForum);


router.route('/:id/reply')
    .post(protect, addReply);

router.route('/:id/reply/:rid/like')
    .post(protect, addLike);

    router.route('/:id/approved').put(approveforum,protect,admin)

export default router;
