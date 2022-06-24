import mongoose from 'mongoose'


const subSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, required:true,ref:'User'
    },
    name:{
        type:String,required:true
    }
  });

const replySchema = mongoose.Schema({
    user: {
        type: subSchema ,required: true,
        
    }, text: {
        type: String, required: true
    }, likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
        }
    }]
}, {
    timestamps: true,
})


const forumSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    }, 
     title: {
        type: String, required: true
    }, description: {
        type: String
    },
    approved:{
        type:Boolean,
        required:true


    },
     replies: [replySchema],
}, {
    timestamps: true,
})

const Forum = mongoose.model('Forum', forumSchema)

export default Forum
