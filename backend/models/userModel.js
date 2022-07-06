import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String, required: true,
    }, email: {
        type: String, required: true, unique: true,
    }, password: {
        type: String, required: true,
    }, address: {
        type: String, // required:true
    }, city: {
        type: String, required: true
    }, postalCode: {
        type: Number, required: true
    }, phone: {
        type: String, required: true

    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
     isAdmin: {
        type: Boolean, required: true, default: false,
    },
}, {
    timestamps: true,
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
