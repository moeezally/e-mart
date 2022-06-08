import mongoose from 'mongoose'

const replySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    }, text: {
        type: String, required: true
    }, likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true
        }
    }]
}, {
    timestamps: true,
})

const forumSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    }, title: {
        type: String, required: true
    }, description: {
        type: String
    }, replies: [replySchema],
}, {
    timestamps: true,
})

const Forum = mongoose.model('Forum', forumSchema)

export default Forum
