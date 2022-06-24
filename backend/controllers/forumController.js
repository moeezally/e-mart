import asyncHandler from 'express-async-handler'
import Forum from "../models/forumModel.js";

export const getForums = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const count = await Forum.countDocuments()
    let forums = await Forum.find({})
        
        .sort('-createdAt')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('user', '_id name');

    forums=forums.filter((forum)=>forum.approved)

    const data = forums.map((forum) => {
        console.log(forum);

        return {
            ...forum._doc, 'replies': [], 'replies_count': forum['replies'].length
        }
    })

    res.json({forums: data, page, pages: Math.ceil(count / pageSize)})
})

export const getAllForums = asyncHandler(async (req, res) => {
    

    const forums = await Forum.find({})
        .populate('user', '_id name');


    const data = forums.map((forum) => {
        return {
            ...forum._doc,
        }
    })
    res.json({forums: data})
})

export const createForum = asyncHandler(async (req, res) => {
    const {
        title, description,
    } = req.body;

    const forum = new Forum({
        user:req.user._id, title, description,approved:false
    });
    console.log(forum)

    const created = await forum.save();

    res.status(201).json(created);
})

export const getForumById = asyncHandler(async (req, res) => {
    const {
        user
    } = req.body;

    let forum = await Forum.findById(req.params.id)
        .populate('user', '_id name')
        .populate('replies.user', '_id name');

    let data = {...forum._doc}

    data.replies = data.replies.map((r) => {
        let reply = {...r._doc};
        if (user) {
            let is_liked = reply.likes.filter((like) => like.user == user);
            reply['liked_by_me'] = is_liked.length > 0;
        }
        reply['total_likes'] = reply.likes.length;
        delete reply['likes'];
        return reply;
    })

    res.json(data);
});

export const addReply = asyncHandler(async (req, res) => {
    const {text} = req.body;

    const updated = await Forum.findByIdAndUpdate(req.params.id, {
        $push: {
            'replies': {
                user: {
                    user:req.user._id,name:req.user.name}, text
            }
        }
    }, {new: true},);

    res.json(updated);
});

export const addLike = asyncHandler(async (req, res) => {

    let forum = await Forum.findById(req.params.id);
    let reply = forum._doc.replies.find((reply) => reply._id == req.params.rid);
    let liked = reply.likes.find(like => String(like.user) == req.user._id);

    let update_data = liked ? {$pull: {'replies.$.likes': {user: req.user._id}}} : {$push: {'replies.$.likes': {user: req.user._id}}}

    const updated = await Forum.findOneAndUpdate({
        _id: req.params.id, 'replies._id': req.params.rid
    }, update_data, {new: true})

    res.json(updated);
});
