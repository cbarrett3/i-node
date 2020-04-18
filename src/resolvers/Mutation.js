const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    // 1
    const hashedPassword = await bcrypt.hash(args.password, 10)
    // 2
    const {password, ...user} = await context.prisma.user.create({
        data: {
            ...args,
            password: hashedPassword
        },
    })
    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 4
    return {
        token,
        user,
    }
}
  
async function login(parent, args, context, info) {
    // 1
    const {password, ...user} = await context.prisma.user({ email: args.email })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.password, password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 3
    return {
      token,
      user,
    }
}

function createPost(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.post.create({
        data: {
            content: args.content,
            author_id: userId,
            attatchment_url: args.attatchment_url,
            time_posted: new Date(new Date() - 234798274),
            author: { connect: { id: userId } },
        }
    })
}

function updatePost(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.post.update({
        where: {
            id: parseInt(args.id),
        },
        data: {
            content: args.content,
            author_id: userId,
            attatchment_url: args.attatchment_url,
            time_posted: new Date(new Date() - 234798274),
            author: { connect: { id: userId } },
        }
    })
}

function deletePost(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.post.delete({
        where: {
            id: parseInt(args.id),
        }
    })
}
  
module.exports = {
    signup,
    login,
    createPost,
    updatePost,
    deletePost
}