import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
    },
    rating: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.__v
  delete user.createdAt
  delete user.updatedAt
  return user
}

userSchema.static('checkCredentials', async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
      return user
    } else {
      return null
    }
  }
  return null
})

export default model('User', userSchema)
